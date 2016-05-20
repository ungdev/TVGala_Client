<template>
  <div id="home" class="display">
    <div class="display-header">
      <div class="display-header-clock">{{ currentDate|hour }}</div>
      <div class="display-header-sms">Vos messages au<br /><strong>06 52 78 98 62</strong></div>
      <div class="clear"></div>
    </div>

    <div class="display-separator"></div>

    <div class="display-schedules">
      <table class="display-schedules-table">
        <tr v-for="schedule in schedules" v-if="!isPast(schedule.end)" class="display-schedules-table-line">
          <td class="display-schedules-table-line-start" v-if="!isPast(schedule.start)">{{ schedule.start|hour }}</td>
          <td class="display-schedules-table-line-start" v-else>En cours</td>
          <td class="display-schedules-table-line-name">{{ schedule.name }}</td>
          <td class="display-schedules-table-line-location">{{ schedule.location }}</td>
        </tr>
      </table>
    </div>

    <div class="display-sms">
      <table class="display-sms-message" v-for="message in sms" transition="fade">
       <tr>
          <td class="display-sms-message-hour">{{ message.time|hour }}</td>
          <td class="display-sms-message-content">{{ message.message|censor censors }}</td>
        </tr>
      </table>
    </div>

    <div class="clear display-separator"></div>

    <div class="display-informations">
      <div class="display-informations-message" v-el:t >
        <span v-show="!displayImages">{{ information.message }}</span>
        <img src="{{ image }}" v-for="image in filteredImages"  v-show="displayImages" class="display-informations-message-image"/>
      </div>
    </div>
  </div>
</template>

<script>
import date from './lib/date';
import censor from './lib/censor';
import config from './config';
import io from 'socket.io-client';

export default {
  data () {
    return {
      currentDate: new Date(),
      informations: [],
      information: {message: "Chargement..."},
      displayImages: false,
      schedules: [],
      censors: [],
      sms: [],
      images: [],
      filteredImages: []
    }
  },
  methods: {
    changeText(informationId) {
      const changeMessage = () => {
        if(informationId == 'images') {
          if(!this.displayImages) this.displayImages = 0
          this.filteredImages = JSON.parse(JSON.stringify(this.images)).splice(this.displayImages*5, 5);
          ++this.displayImages;
        } else {
          this.displayImages = false;
          this.information = this.informations[informationId];
        }
        this.$els.t.className = 't display-informations-message';
        this.$els.t.removeEventListener("transitionend", changeMessage);
      }

      this.$els.t.className = 't fadeout display-informations-message';
      this.$els.t.addEventListener("transitionend", changeMessage, false);
    },
    isPast(date) {
      if(new Date(date) > this.currentDate) return false;
      else return true;
    }
  },
  ready () {
    setInterval(() => {
      this.currentDate = new Date();
    },1000);

    let informationId = 0;
    setInterval(() => {
      if(!this.informations[informationId]) {
        this.changeText('images');
        let sizeImages = Math.ceil(this.images.length/5);
        if(this.displayImages >= (sizeImages-1)) {
          informationId = 0;
        }
      } else {
        this.changeText(informationId);
        ++informationId;
      }
    },5000);
  },
  attached () {
    let socket = io.connect(`http://${config.server.host}:${config.server.port}`);
    socket.on('connect', () => {
      console.log('Client has connected to the server!');
    });

    socket.on('sms', data => {
      this.sms.unshift(data);
    });

    socket.on('informations', data => {
      this.informations = data;
    });

    socket.on('schedules', data => {
      this.schedules = data.sort((a,b) => {
        return new Date(a.start) - new Date(b.start);
      });
    });

    socket.on('censors', data => {
      this.censors = data.sort((a,b) => {
        return b.word.length - a.word.length;
      });
    });

    socket.on('images', data => {
      this.images = data.map(image => {
        return `http://${config.server.host}:${config.server.port}/images/${image}`;
      });
    });
  }
}
</script>

<style>
html, body {
  overflow:hidden;
}

.display {
  background-image:url('../static/background.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
  width:100%;
  height:100%;
  color:white;
  font-family: Helvetica, Arial, sans-serif;
}

.display-header {
  width:100%;
  height:10%;
}

.display-header-clock {
  font-size:6vmin;
  width:10%;
  text-align:center;
  padding-top:0.4%;
  margin-left:16%;
  float:left;
}

.display-header-sms {
  font-size:3.5vmin;
  width:18%;
  text-align:center;
  margin-right:16%;
  float:right;
}

.display-schedules {
  width:60%;
  height:71.6%;
  float:left;
  overflow:hidden;
}

.display-schedules-table {
  width:100%;
  height:100%;
}

.display-schedules-table-line {
  width:100%;
  text-align:center;
  font-size:3vmin;
}

.display-schedules-table-line-start {
  width:20%;
  padding-top:1.5%;
  font-weight:bold;
  font-size:4vmin;
}

.display-schedules-table-line-name {
  padding-top:1.5%;
  width:50%;
  font-size:4.1vmin;
}

.display-schedules-table-line-location {
  padding-top:1.5%;
  width:30%;
}

.display-sms {
  width:39%;
  height:71.6%;
  float:right;
  overflow:hidden;
}

.display-sms-message {
  padding:1%;
  overflow:hidden;
}

.display-sms-message-hour {
  font-weight:bold;
  font-size:2.5vmin;
  width:20%;
  padding-right:10px;
  border-right:1px double white;
}

.display-sms-message-content {
  font-size:2vmin;
  padding-left:10px;
}

.display-informations {
  width:100%;
  height:15.4%;
}

.display-informations-message {
  height:100%;
  width:98%;
  text-align:center;
  margin:auto;
  font-size:6vmin;
  line-height:120%;
}

.display-informations-message-image {
  margin-top:0.5%;
  max-height:90%;
  max-width:15%;
  margin-left:2%;
  margin-right:2%;
  vertical-align:middle;
  line-height:100%;
}

.display-separator {
  width:100%;
  height:1.5%;
}

.clear {
  clear:both;
}

.fade-transition, .t {
  transition: opacity .4s ease;
}
.fade-enter, .t.fadeout {
  opacity: 0;
}
.fade-leave {
  display: none;
}
</style>

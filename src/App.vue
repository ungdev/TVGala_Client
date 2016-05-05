<template>
  <div id="app" class="display">
    <div class="display-header">
      <div class="display-header-clock">{{ currentDate|hour }}</div>
    </div>

    <div class="display-separator"></div>

    <div class="display-schedules">

    </div>

    <div class="display-sms">
    </div>

    <div class="clear display-separator"></div>

    <div class="display-informations">
    </div>
  </div>
</template>

<script>
import date from './lib/date';

export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  ready () {
    setInterval(() => {
      this.currentDate = new Date();
    },1000);
  },
  attached () {
    let socket = io.connect('http://localhost:9000');
    socket.on('connect',() => {
      console.log('Client has connected to the server!');
    });
  }
}
</script>

<style>
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
}

.display-schedules {
  width:60%;
  height:71.6%;
  float:left;
}

.display-sms {
  width:39%;
  height:71.6%;
  float:right;
}

.display-informations {
  width:100%;
  height:15.4%;
}

.display-separator {
  width:100%;
  height:1.5%;
}

.clear {
  clear:both;
}
</style>

<template>
  <div id="admin" class="admin">
    <h2>Censure:</h2>
    <form v-on:prevent>
      <input type="text" v-model="word"/> <input type="submit" value="Ajouter" @click="addCensor(inputCensor)"/>
    </form>
    <br /><br />
    <table class="admin-table">
      <tr v-for="censor in censors">
        <td>{{ censor.word }}</td><td><button @click="deleteCensor(censor)">Supprimer</button></td>
      </tr>
    </table>

    <h2>Informations:</h2>
    <form v-on:prevent>
      <input type="text" v-model="message"/> <input type="submit" value="Ajouter" @click="addInformation(inputInformation)"/>
    </form>
    <br /><br />
    <table class="admin-table">
      <tr v-for="information in informations">
        <td>{{ information.message }}</td><td><button @click="deleteInformation(information)">Supprimer</button></td>
      </tr>
    </table>

    <h2>Programme:</h2>
    <form v-on:prevent>
      <input type="text" v-model="name"/> <input type="text" v-model="location"/><br />
      <input type="text" v-model="start" v-el:datestart /> <input type="text" v-model="end" v-el:dateend /><br />
      <input type="submit" value="Ajouter" @click="addSchedule(inputSchedule)"/>
    </form>
    <br /><br />
    <table class="admin-table">
      <tr v-for="schedule in schedules">
        <td>{{ schedule.name }}</td><td>{{ schedule.location }}</td><td>{{ schedule.start|date }}</td><td>{{ schedule.end|date }}</td><td><button @click="deleteSchedule(schedule)">Supprimer</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import config from './config';
import date, { convertDate } from './lib/date.js';

const headers = {
    headers: {
        Accept        : 'application/json',
        'Content-Type': 'application/json'
    }
};

export default {
  data () {
    return {
      informations: [],
      schedules: [],
      censors: [],
      word: '',
      message: '',
      name: '',
      location: '',
      start: '',
      end: ''
    }
  },
  methods: {
    addInformation(information) {
      fetch(`http://${config.server.host}:${config.server.port}/information`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(information)}))
        .then(res => res.json())
        .then(result => {
          this.informations.push(result);
        });
    },
    addSchedule(schedule) {
      fetch(`http://${config.server.host}:${config.server.port}/schedule`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(schedule)}))
        .then(res => res.json())
        .then(result => {
          this.schedules.push(result);
        });
    },
    addCensor(censor) {
      fetch(`http://${config.server.host}:${config.server.port}/censor`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(censor)}))
        .then(res => res.json())
        .then(result => {
          this.censors.push(result);
        });
    },
    deleteInformation(information) {
      fetch(`http://${config.server.host}:${config.server.port}/information/${information.id}`, Object.assign({}, headers, {method: 'DELETE'}))
        .then(res => res.json())
        .then(result => {
          let i = 0;
          for (const a of this.informations) {
              if (a.id === result.id) {
                break;
              }

              ++i;
          }
          this.informations.splice(i, 1);
        });
    },
    deleteSchedule(schedule) {
      fetch(`http://${config.server.host}:${config.server.port}/schedule/${schedule.id}`, Object.assign({}, headers, {method: 'DELETE'}))
        .then(res => res.json())
        .then(result => {
          let i = 0;
          for (const a of this.schedules) {
              if (a.id === result.id) {
                  break;
              }

              ++i;
          }
          this.schedules.splice(i, 1);
        });
    },
    deleteCensor(censor) {
      fetch(`http://${config.server.host}:${config.server.port}/censor/${censor.id}`, Object.assign({}, headers, {method: 'DELETE'}))
        .then(res => res.json())
        .then(result => {
          let i = 0;
          for (const a of this.censors) {
              if (a.id === result.id) {
                  break;
              }

              ++i;
          }
          this.censors.splice(i, 1);
        });
    }
  },
  computed: {
    inputInformation() {
      const message = this.message;
      this.message = '';
      return {
        message: message
      };
    },
    inputSchedule() {
      const name = this.name;
      const location = this.location;
      const start = this.start;
      const end = this.end;
      this.name = '';
      this.location = '';
      this.start = '';
      this.end = '';
      return {
        name: name,
        location: location,
        start: convertDate(start),
        end: convertDate(end)
      };
    },
    inputCensor() {
      const word = this.word;
      this.word = '';
      return {
        word: word
      };
    }
  },
  attached() {
    fetch(`http://${config.server.host}:${config.server.port}/informations`)
      .then(res => res.json())
      .then(results => {
        this.informations = results;
      });

    fetch(`http://${config.server.host}:${config.server.port}/schedules`)
      .then(res => res.json())
      .then(results => {
        this.schedules = results;
      });

    fetch(`http://${config.server.host}:${config.server.port}/censors`)
      .then(res => res.json())
      .then(results => {
        this.censors = results;
      });

      const $dateStart = this.$els.datestart;
      const $dateEnd   = this.$els.dateend;
      jQuery([$dateStart, $dateEnd]).datetimepicker({
          format:'d/m/Y H:i'
      });
  }
}
</script>

<style>
html, body {
  overflow:visible;
}

.admin {
  padding: 10px;
}

.admin-table {
  border: 1px solid black;
  border-collapse: collapse;
}

.admin-table td {
  border: 1px solid black;
  padding: 5px;
}
</style>

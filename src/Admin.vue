<template>
  <div>
    <h2>Informations:</h2>
    <form v-on:prevent>
      <input type="text" v-model="message"/> <input type="submit" value="Ajouter" @click="addInformation(inputInformation)"/>
    </form>
    <table>
      <tr v-for="information in informations">
        <td>{{ information.message }}</td><td><button @click="editInformation(information)">Modifier</button> <button @click="deleteInformation(information)">Supprimer</button></td>
      </tr>
    </table>

    <h2>Programme:</h2>
    <form v-on:prevent>
      <input type="text" v-model="name"/> <input type="text" v-model="location"/><br />
      <input type="text" v-model="start" v-el:datestart /> <input type="text" v-model="end" v-el:dateend /><br />
      <input type="submit" value="Ajouter" @click="addSchedule(inputSchedule)"/>
    </form>
    <table>
      <tr v-for="schedule in schedules">
        <td>{{ schedule.name }}</td><td>{{ schedule.location }}</td><td>{{ schedule.start|date }}</td><td>{{ schedule.end|date }}</td><td><button @click="editSchedule(schedule)">Modifier</button> <button @click="deleteSchedule(schedule)">Supprimer</button></td>
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

      const $dateStart = this.$els.datestart;
      const $dateEnd   = this.$els.dateend;
      jQuery([$dateStart, $dateEnd]).datetimepicker({
          format:'d/m/Y H:i'
      });
  }
}
</script>

<style>
</style>

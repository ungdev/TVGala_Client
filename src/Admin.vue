<template>
    <div class="adminroot">
      <div id="admin" class="admin">
          <h2>Censure:</h2>
          <form @submit.prevent="addCensor(inputCensor)">
              <input type="text" v-model="word"/> <input type="submit" value="Ajouter"/>
          </form>
          <br /><br />

          <table class="admin-table">
              <tr v-for="censor in censors">
                  <td>{{ censor.word }}</td><td><button @click="deleteCensor(censor)">Supprimer</button></td>
              </tr>
          </table>

          <h2>Informations:</h2>
          <form @submit.prevent="addInformation(inputInformation)">
              <input type="text" v-model="message"/> <input type="submit" value="Ajouter" />
          </form>
          <br /><br />

          <table class="admin-table">
              <tr v-for="information in informations">
                  <td>{{ information.message }}</td><td><button @click="deleteInformation(information)">Supprimer</button></td>
              </tr>
          </table>

          <h2>Programme:</h2>
          <form @submit.prevent="addSchedule(inputSchedule)">
              <input type="text" v-model="name"/> <input type="text" v-model="location"/><br />
              <input type="text" v-model="start" value="2018-06-02T20:06:56.420Z"/>
              <input type="text" v-model="end" value="2018-06-02T20:06:56.420Z"/><br />
              <!--<b-datetime-picker
                v-model="start"
                locale="fr"
                header-format="DD MMM"
                cancel="Annuler"
                next="Suivant"
                class="limit-width"></b-datetime-picker>
              <b-datetime-picker
                v-model="end"
                locale="fr"
                header-format="DD MMM"
                cancel="Annuler"
                next="Suivant"
                class="limit-width"></b-datetime-picker><br />-->
              <input type="submit" value="Ajouter" />
          </form>
          <br /><br />

          <table class="admin-table">
              <tr v-for="schedule in schedules">
                  <td>{{ schedule.name }}</td><td>{{ schedule.location }}</td><td>{{ schedule.start|date }}</td><td>{{ schedule.end|date }}</td><td><button @click="deleteSchedule(schedule)">Supprimer</button></td>
              </tr>
          </table>
      </div>
      <div class="admin-sms">
        <div class="admin-sms-body" v-for="s in sms">
          <h1>@{{ s.from }} :</h1>
          <p>{{ s.message }}</p>
          <form @submit.prevent="deleteSMS(s.id)">
              <input type="submit" value="Supprimer" />
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import config          from './config';
import { convertDate } from './lib/dates';

moment.locale('fr');

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
            schedules   : [],
            censors     : [],
            word        : '',
            message     : '',
            name        : '',
            location    : '',
            start       : new Date(),
            end         : new Date(),
            socket      : io.connect(`http://${config.server.host}:${config.server.port}`),
            sms         : [],
        }
    },
    methods: {
        addInformation(information) {
            fetch(`http://${config.server.host}:${config.server.port}/information`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(information)}))
                .then(res => res.json())
                .then((result) => {
                    this.informations.push(result);
                });
        },
        addSchedule(schedule) {
            fetch(`http://${config.server.host}:${config.server.port}/schedule`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(schedule)}))
                .then(res => res.json())
                .then((result) => {
                    this.schedules.push(result);
                });
        },
        addCensor(censor) {
            fetch(`http://${config.server.host}:${config.server.port}/censor`, Object.assign({}, headers, {method: 'POST', body: JSON.stringify(censor)}))
                .then(res => res.json())
                .then((result) => {
                    this.censors.push(result);
                });
        },
        deleteInformation(information) {
          fetch(`http://${config.server.host}:${config.server.port}/information/${information.id}`, Object.assign({}, headers, {method: 'DELETE'}))
            .then(res => res.json())
            .then((result) => {
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
            .then((result) => {
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
                .then((result) => {
                    let i = 0;
                    for (const a of this.censors) {
                        if (a.id === result.id) {
                            break;
                        }
                        ++i;
                    }
                    this.censors.splice(i, 1);
                });
        },
        deleteSMS(id) {
          fetch(`http://${config.server.host}:${config.server.port}/sms/${id}`, Object.assign({}, headers, {method: 'DELETE'}))
            .then(res => res.json())
            .then((result) => {
                let i = 0;
                for (const s of this.sms) {
                    if (s.id === id) {
                        break;
                    }
                    ++i;
                }
                this.sms.splice(i, 1);
            });
        },
    },
    computed: {
        inputInformation() {
            const message = this.message;
            this.message  = '';
            return {
                message
            };
        },
        inputSchedule() {
            const name     = this.name;
            const location = this.location;
            const start    = this.start;
            const end      = this.end;
            this.name      = '';
            this.location  = '';
            this.start     = new Date();
            this.end       = new Date();
            return {
                name,
                location,
                start,
                end
            };
        },
        inputCensor() {
            const word = this.word;
            this.word  = '';
            return {
                word
            };
        }
    },
    mounted() {
        fetch(`http://${config.server.host}:${config.server.port}/informations`)
            .then(res => res.json())
            .then((results) => {
                this.informations = results;
            });

        fetch(`http://${config.server.host}:${config.server.port}/schedules`)
            .then(res => res.json())
            .then((results) => {
                this.schedules = results;
            });

        fetch(`http://${config.server.host}:${config.server.port}/censors`)
            .then(res => res.json())
            .then((results) => {
                this.censors = results;
            });
        
        this.socket.on('sms', (data) => {
            this.sms = data.reverse().splice(0, 5)
        });
    }
}
</script>

<style>
html, body {
    overflow: visible !important;
}
.adminroot {
  display: flex;
}
.admin {
    padding: 10px;
    width: 50%;
}
.admin-sms {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.admin-sms-body {
  width: 100%;
}

.admin-table {
    border: 1px solid black;
    border-collapse: collapse;
}

.admin-table td {
    border: 1px solid black;
    padding: 5px;
}

.limit-width {
    width: 150px;
}
</style>


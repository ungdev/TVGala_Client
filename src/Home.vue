<template>
    <div class="g-display">
        <div class="g-header">
            <div class="g-header__clock">
                <g-clock></g-clock>
            </div>
        </div>


        <div class="g-content">
            <div class="g-content__partners">
                <g-partners :partners="images"></g-partners>
            </div>
            <div class="g-content__schedules">
                <g-schedules :schedules="schedules"></g-schedules>
            </div>
            <div class="g-content__messages">
                <g-messages :messages="messages" :censors="censors"></g-messages>
            </div>
        </div>

        <div class="g-footer">
            <g-informations :informations="informations"></g-informations>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

import Clock        from './Clock.vue';
import Informations from './Informations.vue';
import Partners     from './Partners.vue';
import Messages     from './Messages.vue';
import Schedules    from './Schedules.vue';

import config from './config.js';
import bde from "./assets/BDE.png"
import nrj from "./assets/NRJ.png"
import meritis from "./assets/meritis.png"
import synetis from "./assets/synetis.png"

export default {
    data() {
        return {
            censors     : [],
            images      : [
              bde,
              nrj,
              meritis,
              synetis,
            ],
            informations: [],
            messages    : [],
            socket      : io.connect(`http://${config.server.host}:${config.server.port}`),
            schedules   : []
        };
    },

    components: {
        'g-clock'       : Clock,
        'g-informations': Informations,
        'g-partners': Partners,
        'g-messages'    : Messages,
        'g-schedules'   : Schedules
    },

    mounted() {
        this.socket.on('connect', () => {
            console.log('Client has connected to the server!');
        })

        this.socket.on('censors', (data) => {
            this.censors = data
                .sort((a, b) => (b.word.length - a.word.length));
        });

        this.socket.on('images', (data) => {
          console.log(data)
            //this.images = data
              //  .map(image => `http://${config.server.host}:${config.server.port}/images/${image}`);
        });

        this.socket.on('informations', (data) => {
            this.informations = data;
        });

        this.socket.on('schedules', (data) => {
            this.schedules = data;
        });

        this.socket.on('sms', (data) => {
            this.messages.unshift(data);
        });
    }
}
</script>

<style lang="css">
@font-face {
    font-family: 'LemonMilk'; /*a name to be used later*/
    src: url('./assets/lemon_milk/LemonMilk.otf'); /*URL to font*/
}
@font-face {
    font-family: 'LemonMilkbold'; /*a name to be used later*/
    src: url('./assets/lemon_milk/LemonMilkbold.otf'); /*URL to font*/
}
.g-display {
    background-image: url('./assets/fond-vertical.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    color: white;
}

.g-header {
    width: 100%;
    height: 7%;
    color: #222222;
    display: flex;
    font-family: 'LemonMilk';
    justify-content: space-between;
}

.g-header > .g-header__clock {
    margin-top: 2%;
    text-align: center;
    width: 10%;
    margin-left: 8%;
    font-size: 6vmin;
    color: white;
}

.g-header > .g-header__message {
    padding-top: 10px;
    text-align: center;
    width: 35%;
    margin-right: 3%;
    font-size: 3.5vmin;
}

.g-separator {
    width: 100%;
    height: 2.5%;
}

.g-content {
    width: 100%;
    height: 85%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    font-family: 'LemonMilk';
}

.g-content > .g-content__partners {
    width: 25.5%;
    height: 17%;
    margin-right: 6.5%;
    margin-left: 50%;
    color: black;
}

.g-content > .g-content__schedules {
    width: 100%;
    height: 52%;
    margin-top: 10%;
}

.g-content > .g-content__messages {
    margin-top: 3%;
    width: 100%;
    height: 16%;
    color:black;
    overflow: hidden;
}

.g-footer {
    margin-top: 3%;
    width: 100%;
    height: 5%;
    font-family: 'LemonMilk';
    color: black;
}
</style>

<template>
    <div class="g-display">
        <div class="g-header">
            <div class="g-header__clock">
                <g-clock></g-clock>
            </div>
        </div>


        <div class="g-content">
            <div class="g-content__left">
                <div class="g-content__partners">
                    <g-partners :partners="images"></g-partners>
                </div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-separator"></div>
                <div class="g-content__messages">
                    <g-messages :sms="sms" :censors="censors"></g-messages>
                </div>
            </div>
            <div class="g-content__schedules">
                <g-schedules :schedules="schedules"></g-schedules>
            </div>
        </div>

        <div class="g-separator"></div>
        <div class="g-separator"></div>
        <div class="g-separator"></div>
        <div class="g-separator"></div>

        <div class="g-footer">
            <g-informations :informations="informations" :images="images"></g-informations>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

import Clock        from './Clock.vue';
import Informations from './Informations.vue';
import Partners from './Partners.vue';
import Messages     from './Messages.vue';
import Schedules    from './Schedules.vue';
import bde from "./assets/BDE.png"
import nrj from "./assets/NRJ.png"
import meritis from "./assets/meritis.png"
import synetis from "./assets/synetis.png"

import config from './config.js';

export default {
    data() {
        return {
            censors     : [],
            images      : [bde, nrj, meritis, synetis],
            informations: [],
            sms         : [],
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
        this.socket.on('informations', (data) => {
            this.informations = data;
        });

        this.socket.on('schedules', (data) => {
            this.schedules = data.sort((a, b) => {
              const d1 = new Date(a.start).getTime()
              const d2 = new Date(b.start).getTime()
              if(d1 > d2) return 1
              if(d1 < d2) return -1
              return 0
            }).splice(0, 2)
        });

        this.socket.on('sms', (data) => {
            this.sms = data.reverse()
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
    background-image: url('./assets/fond-horizontal.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    color: white;
}

.g-header {
    width: 100%;
    height: 5%;
    color: #222222;
    display: flex;
    font-family: 'LemonMilk';
    justify-content: space-between;
}

.g-header > .g-header__clock {
    padding-top: 0px;
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
    height: 72.5%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    font-family: 'LemonMilk';
}

.g-content > .g-content__schedules {
    width: 55%;
    height: 100%;
}

.g-content > .g-content__left {
    width: 45%;
}
.g-content > .g-content__left > .g-content__partners {
    width: 35%;
    height: 35%;
    margin-left: 65%;
    color: black;
}
.g-content > .g-content__left > .g-content__messages {
    margin-left: 8%;
    margin-right: 2%;
    height: 50%;
    color:black;
}

.g-footer {
    width: 100%;
    height: 10%;
    font-family: 'LemonMilk';
    color: black;
}
</style>

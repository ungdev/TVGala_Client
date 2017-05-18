<template>
    <div class="g-display">
        <div class="g-header">
            <div class="g-header__clock">
                <g-clock></g-clock>
            </div>
            <div class="g-header__message">Vos tweets sur le<br /><strong>#GalaUTT2017</strong></div>
        </div>

        <div class="g-separator"></div>

        <div class="g-content">
            <div class="g-content__schedules">
                <g-schedules :schedules="schedules"></g-schedules>
            </div>
            <div class="g-content__messages">
                <g-messages :messages="messages" :censors="censors"></g-messages>
            </div>
        </div>

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
import Messages     from './Messages.vue';
import Schedules    from './Schedules.vue';

import config from './config.js';

export default {
    data() {
        return {
            censors     : [],
            images      : [],
            informations: [],
            messages    : [],
            socket      : io.connect(`http://${config.server.host}:${config.server.port}`),
            schedules   : []
        };
    },

    components: {
        'g-clock'       : Clock,
        'g-informations': Informations,
        'g-messages'    : Messages,
        'g-schedules'   : Schedules
    },

    mounted() {
        this.socket.on('connect', () => {
            console.log('Client has connected to the server!');
        });

        this.socket.on('censors', (data) => {
            this.censors = data
                .sort((a, b) => (b.word.length - a.word.length));
        });

        this.socket.on('images', (data) => {
            this.images = data
                .map(image => `http://${config.server.host}:${config.server.port}/images/${image}`);
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
.g-display {
    background-image: url('./assets/background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    color: white;
}

.g-header {
    width: 100%;
    height: 10%;
    color: #222222;
    display: flex;
    justify-content: space-between;
}

.g-header > .g-header__clock {
    padding-top: 10px;
    text-align: center;
    width: 10%;
    margin-left: 8%;
    font-size: 6vmin;
}

.g-header > .g-header__message {
    padding-top: 10px;
    text-align: center;
    width: 18%;
    margin-right: 8%;
    font-size: 3.5vmin;
}

.g-separator {
    width: 100%;
    height: 1.5%;
}

.g-content {
    width: 100%;
    height: 71.6%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}

.g-content > .g-content__schedules {
    width: 60%;
}

.g-content > .g-content__messages {
    width: 39%;
}

.g-footer {
    width: 100%;
    height: 15.4%;
}
</style>

import Vue from 'vue';

export function parseHour (date) {
    const dateJs = new Date(date);

    const hour    = `0${dateJs.getHours()}`.slice(-2);
    const minutes = `0${dateJs.getMinutes()}`.slice(-2);

    return `${hour}:${minutes}`;
}

Vue.filter('hour', date => parseHour(date));
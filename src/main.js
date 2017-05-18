import DateTimePicker from '@buckless/datetime-picker';
import Vue            from 'vue';
import VueRouter      from 'vue-router';

import Admin     from './Admin.vue';
import App       from './App.vue';
import Home      from './Home.vue';

import './main.css';

Vue.use(VueRouter);

Vue.component('b-datetime-picker', DateTimePicker);

const routes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin }
];

const router = new VueRouter({ routes });

const Client = Vue.extend({
    router,
    components: { App },
    template  : '<App></App>'
});

new Client().$mount('#app');

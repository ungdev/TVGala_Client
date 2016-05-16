import '../static/main.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Admin from './Admin.vue';

Vue.use(VueRouter);

const router = new VueRouter();

const App = Vue.extend({});

router.map({
    '/': {
      component: Home
    },
    '/admin': {
      component: Admin
    }
});

router.start(App, 'body');
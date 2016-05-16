import '../static/main.css';
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js';
import 'jquery-datetimepicker/jquery.datetimepicker.css';
import jQuery from 'jquery';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Admin from './Admin.vue';

window.jQuery = jQuery;

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
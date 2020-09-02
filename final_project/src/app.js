'use strict';

const Vue = require('vue/dist/vue.common');
const Vuex = require("vuex").default;

Vue.use(Vuex);

const app = require('./components/app.vue');
const store = require("./store");

module.exports = new Vue({
    el: '#app',
    store,
    render: h => h(app)
});

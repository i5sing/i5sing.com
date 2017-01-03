/**
 * Created by zhaofeng on 2016/12/2.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex';
import App from './app.vue';

import router from './router/index';

Vue.use(VueRouter);

const app = new Vue({
    router,
    store,
    render: h => h(App)
});

export {app, router, store};
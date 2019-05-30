/**
 * Created by zhaofeng on 2016/12/2.
 */
import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d/src';
import VueRouter from 'vue-router';
import store from './vuex';
import App from './app.vue';

import router from './router/index';

Vue.use(VueRouter);
Vue.use(Carousel3d);

const app = new Vue({
    router,
    store,
    render: h => h(App)
});

export {app, router, store};

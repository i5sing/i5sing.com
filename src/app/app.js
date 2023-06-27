/**
 * Created by zhaofeng on 2016/12/2.
 */
import Vue from 'vue';
import Carousel3d from 'vue-carousel-3d/src';
import VueRouter from 'vue-router';
import store from './vuex';
import App from './app.vue';

import { createRouter } from './router/index';

Vue.use(VueRouter);
Vue.use(Carousel3d);

export const createApp = () => {
    const router = createRouter();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    return { app, router, store };
}

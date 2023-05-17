/**
 * Created by zhaofeng on 2016/12/2.
 */
import VueRouter from 'vue-router';
import * as HomePage from '../page/home.vue';

/**
 * Vue Router
 */
export const createRouter = () => new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', component: HomePage}
    ]
});

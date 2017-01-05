/**
 * Created by zhaofeng on 2016/12/2.
 */
import {WOW} from 'wowjs';
import LazyLoad from 'vanilla-lazyload';

import {app, store} from './app'

//将服务端渲染时候的状态写入vuex
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

//挂载到dom元素
app.$mount('#app');

new WOW().init();

window.lazyload = new LazyLoad();
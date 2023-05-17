/**
 * Created by zhaofeng on 2016/12/2.
 */
import { WOW } from 'wowjs';
import LazyLoad from 'vanilla-lazyload';
import "jquery";
import { createApp } from './app';

const { app, store } = createApp();

//将服务端渲染时候的状态写入vuex
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

//挂载到dom元素
app.$mount('#app');

new WOW().init();

window.lazyload = new LazyLoad();

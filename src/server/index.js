/**
 * Created by zhaofeng on 2016/12/1.
 */
"use strict";
import "babel-polyfill";
import path from 'path';
import Koa from 'koa';
import Mount from 'koa-mount';
import Vue from 'vue';
import KoaViews from 'koa-views';
import Static from 'koa-static';

import {init} from './render/render';
import serverConfig from '../server/config/server';

import Router from './router';

process.env.VUE_ENV = 'server';
global.Vue = Vue;

const app = new Koa();
const appServer = new Koa();
const staticServer = new Koa();
const router = new Router();

init(appServer);

appServer.use(KoaViews(`${__dirname}/views`, {
    map: {html: 'ejs'}
}));

if (process.env.NODE_ENV === 'production') {
    staticServer.use(Static(path.join(__dirname, '../../dist'), {
        maxAge: 2592000,
    }));
}

appServer.use(router.routes(), router.allowedMethods());

app.use(Mount('/', appServer));
app.use(Mount('/dist', staticServer));
app.listen(serverConfig.port || 3033);
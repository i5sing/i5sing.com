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
import Static from 'koa-serve-static';

import {init} from './render/render';
import serverConfig from '../server/config/server';
import syncToCDN from './config/qiniu';

import Router from './router';

process.env.VUE_ENV = 'server';
global.Vue = Vue;

const app = new Koa();
const appServer = new Koa();
const staticServer = new Koa();
const router = new Router();

init(appServer);

if (process.env.NODE_ENV === 'production') {
    appServer.use(KoaViews(path.join(__dirname, '../../dist/views'), {
        map: {html: 'ejs'}
    }));

    Static.staticCacheControl='public';
    staticServer.use(Static(path.join(__dirname, '../../dist'), {
        // maxAge: 2592000,
        setHeaders: function (res, path) {
            // Custom Cache-Control for HTML files
            res.setHeader('Cache-Control', 'public, max-age=' + 24 * 60 * 60 * 1000)
        }
    }));
    // syncToCDN();
} else {
    appServer.use(KoaViews(path.join(__dirname, './views'), {
        map: {html: 'ejs'}
    }));
}

appServer.use(router.routes(), router.allowedMethods());

app.use(Mount('/', appServer));
app.use(Mount('/dist', staticServer));
app.listen(process.env.PORT || serverConfig.port);
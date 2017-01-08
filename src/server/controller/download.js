/**
 * Created by zhaofeng on 2017/1/3.
 */
import BaseController from './base';
import * as downloadService from '../service/download';
import {checkVersion as checkAppVersion} from '../store/app';

export default class DownloadController extends BaseController {
    constructor() {
        super();
    }

    async download(ctx) {
        const params = ctx.params;
        try {
            const app = await downloadService.getApp(params.platform, params.version);
            if (app.url) {
                ctx.redirect(app.url);
            } else {
                ctx.body = {
                    message: 'can not find app.'
                }
            }
        } catch (e) {
            ctx.body = e;
        }
    }

    async checkVersion(ctx) {
        const params = ctx.params;
        try {
            const apps = await checkAppVersion(params.platform, params.version);
            if (apps.length > 0) {
                ctx.body = {
                    latest: false,
                    app: apps[0]
                };
            } else {
                ctx.body = {
                    latest: true
                };
            }
        } catch (e) {
            ctx.body = e;
        }
    }
}
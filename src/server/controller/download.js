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
        const app = await downloadService.getApp(params.platform, params.version);
        ctx.redirect(app.url);
    }

    async checkVersion(ctx) {
        const params = ctx.params;
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
    }
}
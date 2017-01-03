/**
 * Created by zhaofeng on 2017/1/3.
 */
import BaseController from './base';
import * as downloadService from '../service/download';

export default class DownloadController extends BaseController {
    constructor() {
        super();
    }

    async download(ctx) {
        const params = ctx.params;
        const app = await downloadService.getApp(params.platform, params.version);
        ctx.redirect(app.url);
    }
}
/**
 * Created by zhaofeng on 2016/12/1.
 */
import BaseController from './base';
import {getRenderer} from '../render/render';

const env = process.env.NODE_ENV;

export default class HomeController extends BaseController {
    constructor() {
        super();
    }

    async getHomePage(ctx) {
        const context = {url: '/'};

        let html = "";
        try {
            html = await super.renderToString(getRenderer(), context);
        } catch (e) {
            console.log(e);
        }

        await ctx.render(env == 'production' ? 'index.html' : 'index.dev.html', {
            initialState: JSON.stringify(context.initialState || {}).replace(/"/g, '\\"'),
            app: html
        });
    }
}
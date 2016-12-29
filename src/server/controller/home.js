/**
 * Created by zhaofeng on 2016/12/1.
 */
import BaseController from './base';
import {getRenderer} from '../render/render';

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

        await ctx.render('index.html', {
            initialState: JSON.stringify(context.initialState || {}),
            app: html
        });
    }
}
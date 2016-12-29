/**
 * Created by zhaofeng on 2016/12/4.
 */
import BaseController from './base';
import {getRenderer} from '../render/render';

export default class VillaController extends BaseController {
    constructor() {
        super();
    }

    async getVillasPage(ctx, next) {
        await getRenderer();
        ctx.forward('/');
        // return next();
    }
}
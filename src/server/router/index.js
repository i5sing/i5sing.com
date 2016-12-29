/**
 * Created by zhaofeng on 2016/12/2.
 */
import KoaRouter from 'koa-router';

import HomeController from '../controller/home';
import VillaController from '../controller/villa';

export default class Router {
    constructor() {
        const homeController = new HomeController();
        const villaController = new VillaController();

        this.router = new KoaRouter();
        this.router.get('/', homeController.getHomePage);
        this.router.get('/villas/:villaId', villaController.getVillasPage);
        return this.router;
    }
}
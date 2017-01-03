/**
 * Created by zhaofeng on 2016/12/2.
 */
import KoaRouter from 'koa-router';

import HomeController from '../controller/home';
import DownloadController from '../controller/download';

export default class Router {
    constructor() {
        const homeController = new HomeController();
        const downloadController = new DownloadController();

        this.router = new KoaRouter();
        this.router.get('/', homeController.getHomePage);
        this.router.get('/download/:platform', downloadController.download);
        this.router.get('/download/:platform/:version', downloadController.download);
        return this.router;
    }
}
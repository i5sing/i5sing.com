/**
 * Created by zhaofeng on 2016/12/2.
 */
export default class BaseController {
    constructor() {

    }

    renderToString(renderer, app) {
        return new Promise((resolve, reject) => {
            renderer.renderToString(app, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            })
        })
    }
}
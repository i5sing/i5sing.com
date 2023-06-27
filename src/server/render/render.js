/**
 * Created by zhaofeng on 2016/12/2.
 */
import fs from 'fs';
import path from 'path';

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;


let renderer;

export function init(app) {

    if (process.env.NODE_ENV === 'production') {
        //如果是生产环境,bundle是构建完成的正式文件
        const bundlePath = path.resolve(__dirname, '../../../dist/server-bundle.js');
        renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'), { runInNewContext: 'once' })
    } else {
        //如果是开发环境,bundle会在改变之后重新回调生成
        require('../../../build/setup-dev-server')(app, bundle => {
            renderer = createBundleRenderer(bundle, { runInNewContext: 'once' })
        })
    }
}

export function getRenderer() {
    return renderer;
}

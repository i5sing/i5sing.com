/**
 * Created by zhaofeng on 2016/12/2.
 */
import path from 'path';
import webpack from 'webpack';
import MFS from 'memory-fs';
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'

const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

/**
 * 开发调试的server-bundle
 * @param app
 * @param onUpdate
 */
module.exports = function setupDevServer(app, onUpdate) {
    // setup on the fly compilation + hot-reload
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );

    const clientCompiler = webpack(clientConfig);
    app.use(devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }));

    app.use(hotMiddleware(clientCompiler));

    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        onUpdate(mfs.readFileSync(outputPath, 'utf-8'));
    })
};
/**
 * Created by zhaofeng on 2016/12/2.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let vueConfig = {
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions']
        })
    ]
};

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/app/client-entry.js',
        lib: ['vue', 'vue-router', 'vuex', 'wowjs']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'client-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // strip comments in Vue code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './src/server/views/index.html',
            filename: 'views/index.html'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    module.exports.output.filename = 'client-bundle.[hash].js';
    module.exports.output.publicPath = 'http://static.i5sing.com/';

    vueConfig.loaders = {
        less: ExtractTextPlugin.extract({
            loader: "css-loader!less-loader",
            fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
        }),
        css: ExtractTextPlugin.extract({
            loader: "css-loader!less-loader",
            fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
        })
    };

    module.exports.plugins.push(
        new ExtractTextPlugin('style/styles.[contenthash].css'),
        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //将类库文件进行分开打包,便于缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib-bundle.[hash].js'
        })
    )
} else {
    module.exports.plugins.push(
        //将类库文件进行分开打包,便于缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib-bundle.js'
        })
    )
}
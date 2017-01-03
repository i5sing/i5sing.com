/**
 * Created by zhaofeng on 2017/1/3.
 */
import nodemon from 'nodemon';

nodemon({
    exec: 'npm run babel-node',
    env: {'NODE_ENV': 'development'},
    script: './src/server/index.js',
    debug: true,
    watch: ['./src']
});
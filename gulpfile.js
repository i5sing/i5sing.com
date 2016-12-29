const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
// const babel = require('gulp-babel-compile');

gulp.task('run-node-dev', () => {
    nodemon({
        exec: 'npm run babel-node',
        env: {'NODE_ENV': 'development'},
        script: './src/server/index.js',
        debug: true,
        watch: ['./src']
    })
});
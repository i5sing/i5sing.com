/**
 * Created by zhaofeng on 2016/12/2.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as testModule from './modules/test';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        testModule
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});

if (module.hot) {
    // 使 actions 和 mutations 成为可热重载模块
    module.hot.accept(['./mutations', './modules/test'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
        const newMutations = require('./mutations').default;
        const testModule = require('./modules/test').default;
        // 加载新模块
        store.hotUpdate({
            mutations: newMutations,
            modules: {
                test: testModule
            }
        })
    })
}
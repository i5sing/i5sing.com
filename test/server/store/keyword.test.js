/**
 * Created by zhaofeng on 2017/1/3.
 */
import test from 'ava';
import 'babel-polyfill';

import {getKeyword} from '../../../src/server/store/keyword';

test('my passing test', async t => {
    console.log(process.env.NODE_ENV);
    const rows = await getKeyword();
    console.log(rows);
    t.pass();
});
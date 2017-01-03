/**
 * Created by zhaofeng on 2017/1/3.
 */
import Yml from 'yml';
import path from 'path';

const config = Yml.load(path.resolve(__dirname, '../../../', 'application.yml'));

export default config.server[process.env.NODE_ENV] || {};
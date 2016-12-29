/**
 * Created by zhaofeng on 2016/12/29.
 */
import * as zhCN from './zh-CN';
import * as enUS from './en-US';

/**
 * get the specific lang file
 * @param lang
 * @returns {*}
 */
export default lang => {
    return lang == 'zh-CN' ? zhCN : enUS;
}
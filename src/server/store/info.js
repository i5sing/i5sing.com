/**
 * Created by zhaofeng on 2017/1/3.
 */
import {query} from '../config/mysql';


export async function getWebInfo() {
    const sql = 'SELECT id, title, description, head_script, bottom_script FROM web_info';
    return await query(sql);
}
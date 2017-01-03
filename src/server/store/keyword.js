/**
 * Created by zhaofeng on 2017/1/3.
 */
import {query} from '../config/mysql';


export async function getKeyword() {
    const sql = 'SELECT id, keyword FROM keyword';
    return await query(sql);
}
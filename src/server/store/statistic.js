/**
 * Created by zhaofeng on 2017/1/3.
 */
import {connectionQuery} from '../config/mysql';

/**
 * get download statistic by appId.
 * @param conn
 * @param appId
 * @returns {Promise.<*>}
 */
export async function getStatisticByAppId(conn, appId) {
    const sql = `SELECT id, app_id, number FROM statistic WHERE app_id = ${appId}`;
    const rows = await connectionQuery(conn, sql);
    if (rows.length > 0) {
        return rows[0];
    }
    return null;
}

/**
 * increasing download statistic number by appId.
 * @param conn
 * @param appId
 * @returns {Promise.<*>}
 */
export async function increaseStatisticNumber(conn, appId) {
    const sql = `UPDATE statistic SET number = number+1 where app_id = ${appId}`;
    return await connectionQuery(conn, sql);
}

/**
 * insert a download statistic by appId.
 * @param conn
 * @param appId
 * @returns {Promise.<*>}
 */
export async function insertStatistic(conn, appId) {
    const sql = `INSERT INTO statistic (app_id, number) values(${appId}, 1)`;
    return await connectionQuery(conn, sql);
}
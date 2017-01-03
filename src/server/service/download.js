/**
 * Created by zhaofeng on 2017/1/3.
 */
import {beginTransaction} from '../config/mysql';
import * as statisticStore from '../store/statistic';
import * as appStore from '../store/app';

/**
 * get app and update download statistic.
 * @param platform
 * @param version
 * @returns {Promise.<*>}
 */
export async function getApp(platform, version) {
    let app = null;
    if (version && checkVersion(version)) {
        app = await appStore.getSpecificVersionApp(platform, version);
    } else {
        app = await appStore.getLatestApp(platform);
    }

    if (!app) {
        return null;
    }

    // open transaction
    const conn = await beginTransaction();

    const appId = app.app_id;
    try {
        const statistic = await statisticStore.getStatisticByAppId(conn, appId);
        if (statistic) {
            await statisticStore.increaseStatisticNumber(conn, appId);
        } else {
            await statisticStore.insertStatistic(conn, appId);
        }

        return new Promise((resolve, reject) => {
            conn.commit(e => {
                if (e) return reject(e);
                resolve(app);
            });
        });
    } catch (e) {
        return conn.rollback(e => {
            throw e
        });
    }
}

/**
 * check whether the specific version is valid or not.
 * @param version
 * @returns {boolean}
 */
function checkVersion(version) {
    if (!version) return false;
    version = version.replace(/\\./g, '').parseInt();
    return !isNaN(version);
}
/**
 * Created by zhaofeng on 2017/1/3.
 */
import {query} from '../config/mysql';

/**
 * get the latest app with specific platform.
 * @param platform
 * @returns {Promise}
 */
export async function getLatestApp(platform) {
    const sql = `
        SELECT 
            id, version, platform, name, status, url 
        FROM app 
        WHERE platform = '${platform || 'darwin'}'  
        ORDER BY version DESC 
        LIMIT 0, 1`;

    const apps = await query(sql);
    if (apps.length > 0) {
        return apps[0];
    }

    return null;
}

/**
 * get the specific version app
 * @param platform
 * @param version
 * @returns {Promise}
 */
export async function getSpecificVersionApp(platform, version) {
    const sql = `
        SELECT 
            id, version, platform, name, status, url 
        FROM app 
        WHERE platform = '${platform || 'darwin'}' and version = '${version}'`;

    return await query(sql);
}
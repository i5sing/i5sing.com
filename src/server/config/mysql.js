/**
 * Created by zhaofeng on 2016/12/30.
 */
import Mysql from 'mysql';
import Yml from 'yamljs';
import path from 'path';

const config = Yml.load(path.resolve(__dirname, '../../../', 'application.yml'));
const mysql = config.mysql[process.env.NODE_ENV] || {};
const env = process.env;

/**
 * mysql connection pool.
 * @type {Pool}
 */
export const pool = Mysql.createPool({
    connectionLimit: mysql.connectionLimit,
    queueLimit: mysql.queueLimit,
    host: env.MYSQL_HOST || mysql.host,
    port: env.MYSQL_PORT || mysql.port,
    user: env.MYSQL_USER || mysql.user,
    password: env.MYSQL_PASSWORD || mysql.password,
    database: env.MYSQL_DATABASE || mysql.database
});

/**
 * get a connection from pool.
 * @returns {Promise}
 */
export async function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            conn.release();
            if (err) {
                return reject(err);
            }
            resolve(conn);
        });
    });
}

/**
 * execute sql.
 * @param sql
 * @param params
 * @returns {Promise}
 */
export async function query(sql, params = []) {
    const conn = await getConnection();
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, rows) => {
            conn.release();
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * execute sql.
 * @param conn
 * @param sql
 * @param params
 * @returns {Promise}
 */
export async function connectionQuery(conn, sql, params = []) {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, rows) => {
            conn.release();
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * open transaction
 * @returns {Promise}
 */
export async function beginTransaction() {
    const conn = await getConnection();
    return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            conn.release();
            if (err) return reject(err);

            resolve(conn);
        });
    });
}

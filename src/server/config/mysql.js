/**
 * Created by zhaofeng on 2016/12/30.
 */
import Mysql from 'mysql';
import Yml from 'yml';
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
    host: mysql.host || env.MYSQL_HOST,
    port: mysql.port || env.MYSQL_PORT,
    user: mysql.user || env.MYSQL_USER,
    password: mysql.password || env.MYSQL_PASSWORD,
    database: mysql.database || env.MYSQL_DATABASE
});

/**
 * get a connection from pool.
 * @returns {Promise}
 */
export async function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
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
            if (err) {
                return reject(err);
            }
            resolve(rows);
            conn.release();
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
            if (err) return reject(err);

            resolve(conn);
        });
    });
}
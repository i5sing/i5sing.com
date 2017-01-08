/**
 * Created by feng on 2017/1/9.
 */
import qiniu from 'qiniu';
import path from 'path';
import fs from 'fs';
import Yml from 'yml';

const config = Yml.load(path.resolve(__dirname, '../../../', 'application.yml'));
const qiniuConfig = config.qiniu || {};
const env = process.env;

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = env.QINIU_ACCESS_KEY || qiniuConfig.access_key;
qiniu.conf.SECRET_KEY = env.QINIU_SECRET_KEY || qiniuConfig.secret_key;

//要上传的空间
const bucket = env.QINIU_BUCKET || qiniuConfig.bucket;

//构建上传策略函数
function upToken(bucket, key) {
    console.log(bucket, key);
    const putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}

//构造上传函数
function uploadFile(upToken, key, localFile) {
    const extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(upToken, key, localFile, extra, function (err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

function loadFile(filename, currentPath) {
    const fullPath = path.resolve(__dirname, '../../../', 'dist/', currentPath, filename);
    const qiniuFileName = currentPath ? `${currentPath}/${filename}` : filename;
    //生成上传 Token
    const token = upToken(bucket, qiniuFileName);
    console.log('filename is ' + qiniuFileName);
    console.log('path is ' + fullPath);
    //调用uploadFile上传
    uploadFile(token, qiniuFileName, fullPath);
}

function loadPath(dirname) {
    const names = fs.readdirSync(path.resolve(__dirname, '../../../', 'dist/', dirname));
    names.forEach(name => {
        if (!fs.statSync(path.resolve(__dirname, '../../../', 'dist/', dirname, name)).isDirectory()) {
            loadFile(name, dirname);
        }
    });
}

export default function syncToCDN() {
    const names = fs.readdirSync(path.resolve(__dirname, '../../../', 'dist'));
    names.forEach(name => {
        console.log(path.resolve(__dirname, '../../../', 'dist/', name));
        if (fs.statSync(path.resolve(__dirname, '../../../', 'dist/', name)).isDirectory()) {
            loadPath(name)
        } else {
            loadFile(name, '');
        }
    });
}
/**
 * Created by feng on 2017/1/8.
 */
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'N_z0PbQREn_P8pEiomO3MAwNOQfpwnkRgwXd7s0_';
qiniu.conf.SECRET_KEY = 'aqldTdHfe6_imi_gXVQTcGVsr0jfJrR_H8tdXxa-';

//要上传的空间
bucket = 'i5sing';

//构建上传策略函数
function uptoken(bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}

//要上传文件的本地路径
filePath = './ruby-logo.png'

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    const extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}


function loadFile(filename, currentPath) {
    const fullPath = path.resolve(__dirname, '../', 'dist/', currentPath, filename);
    const qiniuFileName = currentPath ? `${currentPath}/${filename}` : filename;
    //生成上传 Token
    token = uptoken(bucket, qiniuFileName);
    console.log('filename is ' + qiniuFileName, 'path is ' + fullPath);
    //调用uploadFile上传
    uploadFile(token, qiniuFileName, fullPath);
}

function loadPath(dirname) {
    const names = fs.readdirSync(path.resolve(__dirname, '../', 'dist/', dirname));
    names.forEach(name => {
        if (!fs.statSync(path.resolve(__dirname, '../', 'dist/', dirname, name)).isDirectory()) {
            loadFile(name, dirname);
        }
    });
}

const names = fs.readdirSync(path.resolve(__dirname, '../', 'dist'));
names.forEach(name => {
    console.log(path.resolve(__dirname, '../', 'dist/', name));
    if (fs.statSync(path.resolve(__dirname, '../', 'dist/', name)).isDirectory()) {
        loadPath(name)
    } else {
        loadFile(name, '');
    }
});
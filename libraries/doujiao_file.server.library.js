/**
 * Created by elinaguo on 2017/1/19.
 */
'use strict';

var exec = require('child_process').exec,
  fs = require('fs');

exports.createDirectory = function (directory, callback) {
  //如果directory中字符间有空格，会以空格为分隔符创建多个目录，加上''后会解决这个问题
  //-p mkdir /test/ccc/ddd,会连续创建 test ccc ddd 层级目录

  exports.fileIsExists(directory, function (isExist) {
    if (!isExist) {
      exec('mkdir -p \'' + directory + '\'', function (err) {
        console.log('mkdir ', directory, err || 'success');
        return callback(err);
      });
    }
    else {
      return callback();
    }
  });
};
exports.deleteDirectory = function (directory, callback) {
  exec('rm -rf ' + directory, function (err) {
    console.log('rm ', directory, err || 'success');
    return callback(err);
  });
};

exports.fileIsExists = function (filePath, callback) {
  fs.exists(filePath, function (exists) {
    return callback(exists);
  });
};

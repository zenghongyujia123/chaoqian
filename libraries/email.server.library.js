/**
 * Created by elinaguo on 15/6/23.
 */
'use strict';

exports.valid = function (str) {
  //邮箱正则
  var mailReg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,}){1,2})$/;
  if (!mailReg.test(str)) {
    return false;
  }

  return true;
};

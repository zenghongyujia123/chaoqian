'use strict';

var postgres = require('pg');
var conString = "postgres://elina:Social2016@localhost/elina-test";

exports.connect = function(conString, callback){
  postgres.connect(conString, function(err, client, done) {
    if(err) {
      console.error('error fetching client from pool', err)
      return callback(err);
    }

    console.log(conString, '  success!!!');
    return callback(err, client, done);
  });
};

function _select(client,selectSQLString, callback)
{
  console.log("select beginning");

  if(!client){
    return callback({err: 'client_null'});
  }

  client.query(selectSQLString,  function selectCb(error, results, fields)
  {
    console.log("in select callback function");
    if (error)
    {
      console.log('GetData Error: ' + error.message),
        client.end();
      return callback(error);
    }
    if(results.rowCount > 0)
    {
      var pois = [];
      for(var i = 0, len = results.rowCount; i < len; i++)
      {
        pois.push(results.rows[i]);
      }
    }
    return callback(null, pois || []);
    /* 添加功能：使查询结果集返回到客户端并保证此函数的通用性. */
  });
  console.log("select end\n");
}

exports.select = _select;

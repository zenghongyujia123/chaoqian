function mi_guan_da_shu_ju(data, callback) {
  if (localStorage.getItem("device") === 'native') {
    return window.location = '/lianlian_pay/page_lianlian?pay_type=query_大数据';
  }
  else {
    get_pre_pay_id('query_大数据', function () {
      $.ajax({
        url: '/third_query/mi_guan_da_shu_ju',
        method: 'post',
        data: {
          name: data.name,
          idCard: data.idcard,
          phone: data.phone
        },
        success: function (data) {
          console.log(data);
          return callback(data);
        }
      });
    })
  }
}

function ge_ren_hei_ming_dan(data, callback) {
  if (localStorage.getItem("device") === 'native') {
    return window.location = '/lianlian_pay/page_lianlian?pay_type=query_黑灰行为';
  }
  else{
    get_pre_pay_id('query_黑灰行为', function () {
      $.ajax({
        url: '/third_query/ge_ren_hei_ming_dan',
        method: 'post',
        data: {
          bankCardNo: data.backnumber,
          idCard: data.idcard,
          mobile: data.phone,
          name: data.name,
        },
        success: function (data) {
          console.log(data);
          return callback(data);
        }
      });
    });
  }
  
}

function hei_zhong_jie(data, callback) {

  return window.location = '/lianlian_pay/page_lianlian?pay_type=query_黑中介';
  
  if (localStorage.getItem("device") === 'native') {
  }
  else{
    get_pre_pay_id('query_黑中介', function () {
      $.ajax({
        url: '/third_query/hei_zhong_jie',
        method: 'post',
        data: {
          mobile: data.phone
        },
        success: function (data) {
          console.log(data);
          return callback(data);
        }
      });
    });
  }
 
}



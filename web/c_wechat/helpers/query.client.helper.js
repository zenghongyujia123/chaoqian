function mi_guan_da_shu_ju(data, callback) {
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
}

function ge_ren_hei_ming_dan(data, callback) {
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
}

function hei_zhong_jie(data, callback) {
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
}



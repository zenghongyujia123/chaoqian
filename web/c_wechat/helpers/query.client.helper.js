function mi_guan_da_shu_ju(data,callback) {
  $.ajax({
    url:'/third_query/mi_guan_da_shu_ju',
    method:'post',
    data:{
      name:'汪振',
      idCard:'411326198208086119',
      phone:'13051837186'
    },
    success:function(data){
      console.log(data);
      return callback(data);
    }
  });
}

function ge_ren_hei_ming_dan(data,callback) {
  $.ajax({
    url:'/third_query/ge_ren_hei_ming_dan',
    method:'post',
    data:{
      bankCardNo: '',
      idCard: '411326198208086119',
      mobile: '13051837186',
      name: '汪振',
    },
    success:function(data){
      console.log(data);
      return callback(data);
    }
  });
}

function hei_zhong_jie(data,callback){
  $.ajax({
    url:'/third_query/hei_zhong_jie',
    method:'post',
    data:{
      mobile: '13051837186'
    },
    success:function(data){
      console.log(data);
      return callback(data);
    }
  });
}



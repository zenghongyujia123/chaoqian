// get my award record list from db.records 

var as_parent_record_list=[];
var as_topparent_record_list=[];
var sum1_parent_loan_award =0;
var sum1_parent_credit_award=0;
var sum1_parent_pos_award=0;
var sum1_parent_vip_award=0;
var sum1_parent_money4agent_award =0;
var sum1_parent_money4Sagent_award=0;
var sum1_parent_car_mgr_award =0;
var sum1_parent_help4credit_award=0;
var sum1_parent_help4card_award=0;

var sum1_topparent_loan_award =0;
var sum1_topparent_credit_award=0;
var sum1_topparent_pos_award=0;
var sum1_topparent_vip_award=0;
var sum1_topparent_money4agent_award =0;
var sum1_topparent_money4Sagent_award=0;
var sum1_topparent_car_mgr_award =0;
var sum1_topparent_help4credit_award=0;
var sum1_topparent_help4card_award=0;

var get_as_parent =function(username){

  var current_date=new Date();
  var ss=current_date.getMonth()+1; 
  var mm_s='2018,'+ss+',2';
  var start=new Date(mm_s);
  var end=current_date; 
  var query_s= {'parent_name':username,"record_date":{$gte:start,$lte:end}};
  //  alert('top_parent:'+top_parent);
    $.ajax({
      url: '/customer_business/recordList',
      method: 'post',
      data: query_s,
      success: function (data) {
        //alert(JSON.stringify(data));
        //return data;
        as_parent_record_list=data;
        as_parent_record_list.map(function(value,index,array){               
          sum1_parent_loan_award += array[index].parent_loan_award;
          sum1_parent_credit_award+= array[index].parent_credit_award;
          sum1_parent_pos_award+= array[index].parent_pos_award;
          sum1_parent_vip_award+= array[index].parent_vip_award;
          sum1_parent_money4agent_award += array[index].parent_money4agent_award;
          sum1_parent_money4Sagent_award+= array[index].parent_money4Sagent_award;
          sum1_parent_car_mgr_award += array[index].parent_car_mgr_award;
          sum1_parent_help4credit_award+= array[index].parent_help4credit_award;
          sum1_parent_help4card_award+= array[index].parent_help4card_award;
        }); 
        alert(sum1_parent_loan_award);

      },
      error: function(err){
        alert('error!');
      }
    });   
  }

  var get_as_topparent =function(username){

    var current_date=new Date();
    var ss=current_date.getMonth()+1; 
    var mm_s='2018,'+ss+',2';
    var start=new Date(mm_s);
    var end=current_date; 
    var query_s= {'topparent_name':username,"record_date":{$gte:start,$lte:end}};
    //  alert('top_parent:'+top_parent);
      $.ajax({
        url: '/customer_business/recordList',
        method: 'post',
        data: query_s,
        success: function (data) {
          //alert(JSON.stringify(data));
          //return data;
          as_topparent_record_list=data;
          as_topparent_record_list.map(function(value,index,array){               
            sum1_topparent_loan_award += array[index].topparent_loan_award;
            sum1_topparent_credit_award+= array[index].topparent_credit_award;
            sum1_topparent_pos_award+= array[index].topparent_pos_award;
            sum1_topparent_vip_award+= array[index].topparent_vip_award;
            sum1_topparent_money4agent_award += array[index].topparent_money4agent_award;
            sum1_topparent_money4Sagent_award+= array[index].topparent_money4Sagent_award;
            sum1_topparent_car_mgr_award += array[index].topparent_car_mgr_award;
            sum1_topparent_help4credit_award+= array[index].topparent_help4credit_award;
            sum1_topparent_help4card_award+= array[index].topparent_help4card_award;
          }); 
          alert(sum1_topparent_loan_award);
  
        },
        error: function(err){
          alert('error!');
        }
      });   
    }
  




  var recordListAsParent = function(username){

      as_parent_record_list=[];
      as_topparent_record_list=[];
//统计本月截至今天所有的返佣,使用本用户电话号码
//先取得当天日期和本月，组装query_s  .getTime().toLocaleString()
      get_as_parent(username);
      get_as_topparent(username);
  };





$(function () {
//  var myphone=$('.myphone').text();
//  myphone=myphone.replace(/[\r\n]/g, "");
//  myphone = myphone.replace(/[ ]/g, ""); 
//  alert(myphone);
//  recordListAsParent(myphone);

  });

  
  $('.signup-btn').click(function () {
/*
   $.ajax({
      url: '/user/signup',
      method: 'post',
      data: {
        user_info: {
          username: username,
          password: password,
          topparent:topparent,
          code: $('.invite_code').val()//text()
        }
      },
      success: function (data) {
        if (data.err) {
          return alert(data.err.zh_message);
        }
        console.log(data);
        if (data.success) {
          window.location = '/page_wechat/home';
        }
      }
    });
  */

  });



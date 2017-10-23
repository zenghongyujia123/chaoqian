$(function () {
  $('.footer-btn').click(function () {
    getSelects();
  });
  function getSelects() {
    //   var a = $("input[name='请问您需要的资金金额大小']:checked").val();
    //   var b = $("input[name='请问您贷款的用途是什么']:checked").val();
    //   var c = $("input[name='请问以下您能接受的方式是什么']:checked").val();
    //   var d = $("input[name='请问您的性别及婚姻状况']:checked").val();
    var e = $("input[name='请问您的电商采购历史']:checked").val();
    var f = $("input[name='请问选择以下贴合您的信用卡状况']:checked").val();
    var g = $("input[name='请选择以下符合您申请贷款实情的']:checked").val();
    var h = $("input[name='请选择以下符合您实际情况的答案']:checked").val();
    // var i = $("input[name='关于工作情况以下符合您实际情况的']:checked").val();
    // var j = $("input[name='请选择以下符合您实际情况的']:checked").val();
    var codes = [e, f, g, h];
    console.log(codes);
    for (var i = 0; i < codes.length; i++) {
      if (!codes[i]) {
        alert('请完善所有回答！');
        return;
      }
    }


    var doc = {
      e: {
        'A': '4',
        'B': '4',
        'C': '4',
        'D': '3',
      },
      f: {
        'A': '3',
        'B': '1',
        'C': '4',
        'D': '2',
      },
      g: {
        'A': '4',
        'B': '1',
        'C': '3',
        'D': '2',
      },
      h: {
        'A': '3',
        'B': '3',
        'C': '4',
        'D': '3',
      }
    }



    var xinyongs = [
      {
        text: '差',
        value: '2500元',
        codes: [
          '3113', '3114', '3123', '3124', '3133', '3134', '3143', '3144',
          '3213', '3214', '3313', '3314', '3413', '3414', '4114', '4123',
          '4124', '4133', '4134', '4143', '4144', '4213', '4214', '4313',
          '4314', '4413', '4414', '4113'
        ]
      },
      {
        text: '一般',
        value: '5000元',
        codes: [
          '3233', '3234', '3243', '3244', '3323', '3324', '3343', '3344', '3423',
          '3424', '4233', '4234', '4243', '4244', '4323', '4324', '4333', '4334',
          '4343', '4423', '4424'
        ]
      },

      {
        text: '差',
        value: '3500元',
        codes: [
          '3223', '3224', '4223', '4224'
        ]
      },

      {
        text: '差',
        value: '1000元',
        codes: [
          '3333', '3334'
        ]
      },

      {
        text: '较好',
        value: '7000元',
        codes: [
          '3433', '3443', '4344', '4433'
        ]
      },

      {
        text: '很好',
        value: '10000元',
        codes: [
          '3434', '4434'
        ]
      },

      {
        text: '非常好',
        value: '20000元',
        codes: [
          '3444', '4443', '4444'
        ]
      }
    ];

    var code = '' + doc.e[e] + doc.f[f] + doc.g[g] + doc.h[h];

    var result = null;
    xinyongs.forEach(function (item) {
      if (item.codes.indexOf(code) >= 0) {
        result = item;
      }
    });

    console.log(code);
    console.log(result);
    window.location = '/page_wechat/result?text=' + result.text + '&price=' + result.value;
    //
  }
});


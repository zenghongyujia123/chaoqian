function goToWindow(url, name) {

  if (typeof (api) !== 'undefined') {
    if (url.indexOf('http') === -1) {
      url = 'http://www.chaoqianwang.com' + url;
    }
    api.openWin({
      name: new Date().getTime().toString(),
      url: 'widget://html/new_window.html',
      pageParam: {
        url: url,
        name: name || '标题'
      }
    });
  }
  else {
    window.location = url;
  }
}

function signinSuccess() {
  if (typeof (api) !== 'undefined') {
    api.closeWin({
    });
  }
  else {
    window.location = '/page_wechat/home';
  }
}
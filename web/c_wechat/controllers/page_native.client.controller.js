function goToWindow(url, name) {
  if (api) {
    api.openWin({
      name: new Date().getTime().toString(),
      url: 'widget://html/new_window.html',
      pageParam: {
        url: 'http://www.chaoqianwang.com' + url,
        name: name || '标题'
      }
    });
  }
  else {
    window.location = url;
  }
}

function signinSuccess() {
  if (api) {
    api.closeWin({
    });
  }
  else {
    window.location = '/page_wechat/home';
  }
}
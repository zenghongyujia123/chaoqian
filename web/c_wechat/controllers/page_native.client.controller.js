function goToWindow(url, name) {
  if (localStorage.getItem("device") === 'native') {
    api.openWin({
      name: new Date().getDate().toString(),
      url: 'widget://html/new_window.html',
      pageParam: {
        url: 'http://chaoqianwang.com' + url,
        name: name || '标题'
      }
    });
  }
  else {
    window.location = url;
  }
}
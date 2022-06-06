// app.js

App({
  /**生命周期回调——监听小程序初始化。 */
  onLaunch() {
    // 初始化腾讯位置服务SDK
    const QQMapWX = require('/libs/qqmap-wx-jssdk.min.js');
    const qqmapsdk = new QQMapWX({key: "H5FBZ-4VC6W-P7SRE-RSYEF-VJ5KZ-B3B3D"});
    this.globalData.qqmapsdk = qqmapsdk;
  },
  globalData: {
    qqmapsdk: null,
  }
})

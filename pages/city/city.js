// pages/city/city.js
const map = require("../../libs/map.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName: "定位中...",
    citylist: map,
    currentLetter: "A",
  },
  /**点击字母跳转到指定字母位置 */
  tapLetter(e) {
    let letter = e.currentTarget.dataset.index;
    this.setData({currentLetter: letter});
  },
  /**点击当前城市 */
  tapCurrentCity(e) {
    let city = e.currentTarget.dataset.city;
    getApp().globalData.cityName = city;
    wx.navigateBack();
  },
  /**点击城市 */
  bindCity(e) {
    let city = e.currentTarget.dataset.index;
    getApp().globalData.cityName = city;
    wx.navigateBack();
  },
  /**获取地理位置 */
  loadLocation() {
    const qqmapsdk =  getApp().globalData.qqmapsdk;
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        const cityName = res.result.address_component.city;
        this.setData({cityName});
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.loadLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
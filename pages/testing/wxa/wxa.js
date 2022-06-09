// pages/wxa/wxa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "未选择"
  },
  tapToB(e){
    wx.navigateTo({
      url: '/pages/testing/wxb/wxb',
      events: {
        getCityFromB: (city) => {
          this.setData({city})
        }
      }
    })
  },

  handleTap1(e) {
    console.log("handleTap1", e)
  },
  handleTap2(e) {
    console.log("handleTap2", e)
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
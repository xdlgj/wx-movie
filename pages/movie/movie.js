// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    isOpen: false,
  },
  /**获取电影详细内容 */
  loadMovie(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.tedu.cn/detail.php',
        method: "GET",
        data: {id},
        success: (result) => {
          resolve(result.data);
        },
      })
    });
  },
  /**点击电影描述 */
  tapDesc() {
    this.setData({
      isOpen: !this.data.isOpen
    })
  },
  /**点击预览图片 */
  tapPreImg(e) {
    let index = e.target.dataset.index;
    let urls = this.data.movie.thumb.map(item => item.split("@")[0])
    wx.previewImage({
      urls: urls,
      current: urls[index],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
     // 获取电影详细数据
     let id = options.id
     let movie = await this.loadMovie(id);
     console.log(movie)
     this.setData({movie});
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
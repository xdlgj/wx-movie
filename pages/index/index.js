// index.js

Page({
  data: {
    cid: 1, // 1: 热映 2、待映 3、经典
    pageno: 1,
    movies: [],
    bottom: false, // 是否已经获取完所有数据
    cityName: "未选择",
  },
  /**获取地理位置 */
  loadLocation() {
    const qqmapsdk =  getApp().globalData.qqmapsdk;
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        const cityName = res.result.address_component.city;
        this.setData({cityName});
        getApp().globalData.cityName = cityName;
        wx.setStorage({key: "cityName", data: cityName});
      },
    });
  },
  /**点击城市 */
  tapCity() {
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  /**点击电影分类 */
  tapTopNav(e) {
    let cid = e.target.dataset.cid;
    if (cid == this.data.cid) {
      // 同一个类别不需要发送请求
      return;
    };
    this.setData({
      cid,
      pageno: 1,
      movies: [],
      bottom: false,
    }); //回到第一页

    // 先去缓存中取数据，如果没有再发送请求获取数据
    wx.getStorage({
      key: cid,
      success: (res) => { // 获取到了缓存数据
        this.setData({movies: res.data});
      },
      fail: async () => { // 没有缓存数据
        let offset = (this.data.pageno - 1) * 20;
        let movies = await this.loadMovies(cid, offset);    
        this.setData({
          movies: [...this.data.movies, ...movies]
        });
        // 存入缓存Storage中
        wx.setStorage({
          key: cid,
          data: movies,
        });
      }
    });
  },
  /**下拉刷新 */
  async onPullDownRefresh() {
    // 加载新的数据
    let movies = await this.loadMovies(this.data.cid, 0);
    this.setData(movies);
    wx.setStorage({
      key: this.data.cid+'',
      data: movies
    });
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  /**获取电影数据 */
  loadMovies(cid, offset) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.tedu.cn/index.php',
        method: "GET",
        data: {cid, offset},
        success: (result) => {
          // 响应成功后，回调resolve，把电影列表交给loadMovies的调用者
          resolve(result.data);
          wx.hideLoading();
        }
      })
    })
  },
  /**监听用户上拉触底事件。 */
  async onReachBottom() {
    if (this.data.bottom) {
      return;
    }
    this.data.pageno++;
    let offset = (this.data.pageno - 1 ) * 20;
    let movies = await this.loadMovies(this.data.cid, offset);
    let newMovices = this.data.movies.concat(movies);
    this.setData({
      movies: newMovices
    });
    if (movies.length < 20) {
      // 没有新的数据
      this.setData({bottom: true})
      return;
    } 
  },
   /**
   * 生命周期函数--监听页面加载,一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
   */
  onLoad() {
    // 解决每次启动都从 未选择 ==> 当前城市
    wx.getStorage({
      key: "cityName",
      success: (res) => {
        this.setData({cityName: res.data})
      }
    });
    // 获取地址位置信息
    this.loadLocation();
    // 获取电影数据
    let offset = (this.data.pageno - 1) * 20;
    // 也可以使用async、await 获取数据
    this.loadMovies(this.data.cid, offset).then(movies => {
      this.setData({movies});
    })
  },
  onShow() {
    this.setData({cityName: getApp().globalData.cityName})
  }
})

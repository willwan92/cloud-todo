// pages/index/index.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    page: 0,
    pageSize: 20,
    isAll: false //是否已经加载完所有的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodos();
  },
  onPullDownRefresh() {
    !this.data.isAll && this.getTodos()
      .then(() => {
        wx.stopPullDownRefresh()
      })
  },
  onReachBottom() {
    !this.data.isAll && this.getTodos();
  },
  getTodos() {
    wx.showLoading({
      title: '努力加载中...',
    })
    const skip = this.data.page * this.data.page
    return todos
      .skip(skip)
      .get()
      .then(res => {
        wx.hideLoading()
        this.setData({
          page: this.data.page += 1,
          todos: [...this.data.todos].concat(res.data),
          isAll: res.data.length < this.data.pageSize
        })
      })
  }
})
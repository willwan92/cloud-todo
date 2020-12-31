// pages/todoDetail/todoDetail.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodoDetail(options.id)
  },

  getTodoDetail(id) {
    todos
      .doc(id)
      .get()
      .then(res => {
        console.log(res)
        this.setData({
          task: res.data
        })
      })
  }

})
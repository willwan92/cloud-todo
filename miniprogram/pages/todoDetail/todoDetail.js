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

  handleAddressClick(e) {
    const location = this.data.task.location
    wx.openLocation({
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      fail: (err) => {
        console.log(err);
      }
    })
  },

  getTodoDetail(id) {
    todos
      .doc(id)
      .get()
      .then(res => {
        const task = res.data
        task.location && (task.location = JSON.parse(task.location))
        this.setData({
          task: task
        })
      })
  }

})
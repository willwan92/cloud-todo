// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({
  data: {
    image: '',
    location: null
  },
  handleChooseLocationTap() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.chooseLocation()
            }
          })
        } else {
          this.chooseLocation()
        }
      }
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        const { address, name, latitude, longitude } = res;
        this.setData({ location: { address, name, latitude, longitude } });
      }
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({ image: res.tempFilePaths[0] })
      }
    })
  },
  uploadImg() {
    const img = this.data.image
    return wx.cloud.uploadFile({
      filePath: img,
      cloudPath: Math.floor(Math.random() * 100000000) + img.split('.')[1]
    }).then(res => {
      return res.fileID
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  addTodo(data) {
    todos
      .add({
        data: data
      })
      .then(res => {
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '添加成功',
              icon: 'success'
            })
            wx.redirectTo({
              url: '../index/index'
            })
          }
        })
      })
  },
  onSubmit: function(e) {
    wx.showLoading({
      title: '正在添加...',
    })
    const params = { ...e.detail.value }
    params.location = JSON.stringify(this.data.location)
    if (this.data.image) {
      this.uploadImg()
        .then(res => {
          params.image = res
          this.addTodo(params)
        })
    } else {
      this.addTodo(params)
    }
  }
})
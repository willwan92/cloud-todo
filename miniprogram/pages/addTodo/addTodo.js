// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  onSubmit: function(e) {
    console.log();
    todos
      .add({
        data: e.detail.value
      })
      .then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      })

  }
})
// pages/student/stuctr/stuctr.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
  avatar:'../../../images/stucenter/student.png',
  nkname:'',
  name:'',
  sex:'',
  sig:'',
  pic:'',
  },


  Exit()
  {
    console.log("退出");
    wx.redirectTo({url:'/pages/chooseppl/chooseppl'})
  },

  Change()
  {
    console.log("管理个人信息");
    wx.navigateTo({url:'/pages/student/stuctr/change/change'})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
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
    var th=this
    wx.request({
      url:'http://127.0.0.1:5000/sctr',
      data:{
        id:wx.getStorageSync('stuid')
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        th.setData({
          nkname:res.data[0][1],
          name:res.data[0][2],
          sex:res.data[0][3],
          sig:res.data[0][4],
          pic:res.data[0][5],
        })
      }
    },
    )
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
         selected: 2
        })
      }
  },

  Dlusr()
  {
    wx.request({
      url:'http://127.0.0.1:5000/delusr',
      data:{
        id:wx.getStorageSync('stuid')
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        if(res.data=='yes')
        {
          setTimeout(() => {
            wx.showToast({
              icon:"success",
              title:"注销成功",
            })
          }, 200);
          wx.redirectTo({
            url:"/pages/chooseppl/chooseppl"
          })
        }
        else
        {
          wx.showToast({
            icon:"error",
            title:"注销失败",
          })
        }
      }
    })
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
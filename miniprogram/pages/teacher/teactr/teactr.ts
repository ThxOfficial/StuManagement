// pages/teacher/teactr/teactr.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'../../../images/teacenter/teacher.png',
    name:'',
    sex:'',
    pic:'',
    sig:'',
  },

  Exit()
  {
    console.log("退出");
    wx.redirectTo({url:'/pages/chooseppl/chooseppl'})
  },

  Change()
  {
    console.log("管理个人信息");
    wx.navigateTo({url:'/pages/teacher/teactr/change/change'})
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
      url:'http://127.0.0.1:5000/tctr',
      data:{
        id:wx.getStorageSync('teaid')
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        th.setData({
          name:res.data[0][1],
          sex:res.data[0][2],
          pic:res.data[0][3],
          sig:res.data[0][4],
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
// pages/teacher/home/detail/studetl/studetl.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:"",
    id:"",
    name:"",
    nkname:"",
    sex:"",
    sig:"",
  },

  Back()
  {
    wx.redirectTo({
      url:'/pages/teacher/home/detail/detail'
    })
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
    var th=this;
    th.setData({
      id:wx.getStorageSync("stulookid"),
    })
    wx.request({
      url:'http://127.0.0.1:5000/stuinfo',
      data:{
        id:this.data.id,
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log("this",res);
        th.setData({
          name:res.data[2],
          nkname:res.data[1],
          sex:res.data[3],
          sig:res.data[4],
          pic:res.data[5],
        })
      }
    },
    )
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
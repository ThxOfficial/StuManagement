// pages/student/home/detail/detail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    cinfo:[],
    tinfo:[],
  },
  
  Del()
  {
    //@ts-ignore
    this.data.cid=wx.getStorageSync("cgcid")
    wx.request({
      url:'http://127.0.0.1:5000/scdel',
      data:{
        sid:wx.getStorageSync("stuid"),
        cid:this.data.cid,
      },
      header:{
        'content-type':'application/json'
      },
      success()
      {
        wx.showToast({
          icon:'none',
          title:'退课成功',
        })
      }
    })
    wx.switchTab({
      url:'/pages/student/home/home'
    })
  },

  Back()
{
  wx.switchTab({
    url:'/pages/student/home/home'
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
    var th = this;
    wx.request({
      url:'http://127.0.0.1:5000/scdetl',
      data:{
        cid:wx.getStorageSync("cgcid"),
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log("this",res);
        th.setData({
          cinfo:res.data[0],
          tinfo:res.data[1],
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
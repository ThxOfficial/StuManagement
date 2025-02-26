// pages/teacher/home/detail/detail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    cinfo:[],
    sinfo:[],
  },

  Detl(e:any)
{
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  //@ts-ignore
  wx.setStorageSync("stulookid",this.data.sinfo[idx].ID);
  wx.redirectTo({
    url:'/pages/teacher/home/detail/studetl/studetl'
  })
},

  Back()
{
  wx.switchTab({
    url:'/pages/teacher/home/home'
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
    this.data.cid=wx.getStorageSync("cgcid");
    wx.request({
      url:'http://127.0.0.1:5000/thomedetl',
      data:{
        cid:this.data.cid,
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log("this",res);
        th.setData({
          cinfo:res.data[0],
          tinfo:res.data[1],
          sinfo:res.data[2],
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
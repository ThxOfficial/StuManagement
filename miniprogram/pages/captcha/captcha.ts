// pages/captcha/captcha.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:"",
    corrval:"1234",
    picpath:"",
    tms:0,
  },

Cptc(e:any)
{
  this.data.val=e.detail.value;
},

Cfm()
{
  var val=this.data.val;
  if(val==this.data.corrval)
  {
    var roleid=wx.getStorageSync('roleId');
    if(roleid==0)
    {
      wx.switchTab({
        url:'/pages/student/home/home',
      })
    }
    else{
      wx.switchTab({
        url:'/pages/teacher/home/home',
      })
    }
  }
  else{
    wx.showToast({
      icon:'error',
      title:'验证码错误',
    })
    this.data.tms=this.data.tms+1;
  }
  if(this.data.tms>=5)
  {
    wx.showToast({
      icon:'error',
      title:'强制退出',
    })
    this.Back();
  }
},

Cg()
{
  wx.redirectTo({
    url:'/pages/captcha/captcha',
  })
},

Back()
{
  wx.navigateTo({
    url:'/pages/chooseppl/chooseppl',
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
    var th=this
    wx.request({
      url:'http://127.0.0.1:5000/captcha',
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log("1",res.data[1]);
        console.log("2",res.data[2]);
          th.setData({
            picpath:res.data[1],
            corrval:res.data[2],
          })
      },
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
    wx.redirectTo({
      url:"/pages/captcha/captcha",
    })
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
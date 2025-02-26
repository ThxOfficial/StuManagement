// pages/teacher/oper/sc/tc/tc.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    allt:[],
    name2:"",
    tid:"",
  },
  Scnm(e:any)
{
  this.data.name2=e.detail.value;
},

SeCh2()
{
  var th=this;
  var acrtnm=this.data.name2;
  wx.request({
    url:'http://127.0.0.1:5000/searchteacher2',
    data:{
      name:acrtnm,
    },
    header:{
      'content-type':'application/json'
    },
    success(res){
      console.log(res.data)
        th.setData({
          //@ts-ignore
          allt:res.data
        })
    },
  })
},


  Choose(e:any)
  {
    var index = e.currentTarget.dataset.index;
    console.log("this is",index);
    var idx:Number=Number(index);
    //@ts-ignore
    this.data.tid=this.data.allt[idx].TID
    wx.request({
      url:'http://127.0.0.1:5000/tc',
      data:{
        tid:this.data.tid,
        cid:this.data.cid,
      },
      header:{
        'content-type':'application/json'
      },
      success(res)
      {
        if(res.data=='yes')
        {
          wx.showToast({
            icon:'success',
            title:'分配成功',
          })
        }
        else{
          wx.showToast({
            icon:'error',
            title:'分配失败',
          })
        }
      }
    })
    setTimeout(() => {
      wx.redirectTo({
        url:'/pages/teacher/oper/sc/sc'
      })
    }, 200);
  },

Back()
{
  wx.redirectTo({url:"/pages/teacher/oper/sc/sc"})
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
      url:'http://127.0.0.1:5000/teacher',
      data:{
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
          th.setData({
            //@ts-ignore
            allt:res.data,
            cid:wx.getStorageSync("cgcid")
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
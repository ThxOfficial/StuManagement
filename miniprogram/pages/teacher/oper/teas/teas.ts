// pages/teacher/oper/teas/teas.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allt:[],
    tid:'',
    name1:'',
    name2:''
  },

  Scnm1(e:any)
{
  this.data.name1=e.detail.value;
},

Scnm2(e:any)
{
  this.data.name2=e.detail.value;
},


SeCh1()
{
  var th=this;
  var acrtnm=this.data.name1;
  wx.request({
    url:'http://127.0.0.1:5000/searchteacher1',
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

Add()
{
wx.redirectTo({
  url:'/pages/teacher/oper/teas/add/add'
})
},

Chge(e:any)
{
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  //@ts-ignore
  console.log("tidcg",this.data.allt[idx].TID)
  //@ts-ignore
  wx.setStorageSync("cgtid",this.data.allt[idx].TID);
  wx.redirectTo({
    url:'/pages/teacher/oper/teas/change/change'
  })
},

Del(e:any)
{
  var index = e.currentTarget.dataset.index;
  console.log("this is",index);
  var idx:Number=Number(index);
  //@ts-ignore
  this.data.tid=this.data.allt[idx].TID
  wx.request({
    url:'http://127.0.0.1:5000/teadel',
    data:{
      tid:this.data.tid,
    },
    header:{
      'content-type':'application/json'
    },
    success()
    {
      wx.showToast({
        icon:'none',
        title:'删除成功',
      })
    }
  })
  wx.redirectTo({
    url:'/pages/teacher/oper/teas/teas'
  })
  console.log("这里调用过");
},


Back()
{
  wx.switchTab({
    url:'/pages/teacher/oper/opchoose'
  })
},

Dld()
{
wx.request({
    url:'http://127.0.0.1:5000/download',
    data:{
      fl:this.data.allt,
      name:"teacher"
    },
    header:{
      'content-type':'application/json'
    },
    success(){
      wx.showToast({
        icon:'success',
        title:'导出成功'
      })
    },
    fail()
    {
      wx.showToast({
        icon:'error',
        title:'导出失败'
      })
    },
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
            allt:res.data
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
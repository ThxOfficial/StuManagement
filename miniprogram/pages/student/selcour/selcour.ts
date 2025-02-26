// pages/student/selcour/selcour.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name1:"",
    name2:"",
    allc:[],
    cid:"",
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
    url:'http://127.0.0.1:5000/searchsc',
    data:{
      name:acrtnm,
      action:"acrt",
      sid:wx.getStorageSync("stuid"),
    },
    header:{
      'content-type':'application/json'
    },
    success(res){
      console.log(res.data)
        th.setData({
          //@ts-ignore
          allc:res.data
        })
    },
  })
},

SeCh2()
{
  var th=this;
  var acrtnm=this.data.name2;
  wx.request({
    url:'http://127.0.0.1:5000/searchsc',
    data:{
      action:'blur',
      name:acrtnm,
      sid:wx.getStorageSync("stuid"),
    },
    header:{
      'content-type':'application/json'
    },
    success(res){
      console.log(res.data)
        th.setData({
          //@ts-ignore
          allc:res.data
        })
    },
  })
},

Slct(e:any)
{
  var th=this;
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  //@ts-ignore
  this.data.cid=this.data.allc[idx].CID;
  wx.request({
    url:'http://127.0.0.1:5000/sc',
    data:{
      sid:wx.getStorageSync("stuid"),
      cid:this.data.cid,
    },
    header:{
      'content-type':'application/json'
    },
    success(res)
    {
      wx.showToast({
        icon:'success',
        title:'选课成功',
      })
      th.setData({
        //@ts-ignore
        allc:res.data,
      })
      wx.switchTab({
        url:'/pages/student/selcour/selcour'
      })
    }
  })
},

Detl(e:any)
{
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  //@ts-ignore
  wx.setStorageSync("cgcid",this.data.allc[idx].CID);
  wx.redirectTo({
    url:'/pages/student/selcour/detail/detail'
  })
},


//选退课记得给detail一份

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
      url:'http://127.0.0.1:5000/selcour',
      data:{
        sid:wx.getStorageSync("stuid"),
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
          th.setData({
            //@ts-ignore
            allc:res.data,
          })
          console.log("1",th.data.allc)
      },
    })
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
         selected: 1
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
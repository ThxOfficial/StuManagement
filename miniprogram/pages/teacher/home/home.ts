// pages/home/home.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allc:[],
    cid:'',
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
    url:'http://127.0.0.1:5000/searchhome1',
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
    url:'http://127.0.0.1:5000/searchhome2',
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
          allc:res.data
        })
    },
  })
},

Detl(e:any)
{
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  //@ts-ignore
  console.log("thisis",this.data.allc[idx].CID)
  //@ts-ignore
  wx.setStorageSync("cgcid",this.data.allc[idx].CID);
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
    var th=this
    wx.request({
      url:'http://127.0.0.1:5000/thome',
      data:{
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
    if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
      this.getTabBar().setData({
         selected: 0
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
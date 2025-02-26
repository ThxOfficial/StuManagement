// pages/teacher/oper/sc/sc.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    allc1:[],
    allc2:[],
    name1:"",
    name2:"",
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
    url:'http://127.0.0.1:5000/searchtc1',
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
          allc1:res.data
        })
    },
  })
},

SeCh2()
{
  var th=this;
  var acrtnm=this.data.name2;
  wx.request({
    url:'http://127.0.0.1:5000/searchtc2',
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
          allc2:res.data
        })
    },
  })
},

  TeaArr(e:any)
{
  var index = e.currentTarget.dataset.index;
  var idx:Number=Number(index);
  console.log(e.currentTarget.dataset.index)
  //@ts-ignore
  console.log("cidcg",this.data.allc1[idx].CID)
  //@ts-ignore
  wx.setStorageSync("cgcid",this.data.allc1[idx].CID);
  wx.redirectTo({
    url:'/pages/teacher/oper/sc/tc/tc'
  })
},

TeaDel(e:any)
{
  var index = e.currentTarget.dataset.idx;
  console.log("this is",index);
  var idx:Number=Number(index);
  //@ts-ignore
  this.data.cid=this.data.allc2[idx].CID
  wx.request({
    url:'http://127.0.0.1:5000/tcdel',
    data:{
      cid:this.data.cid,
    },
    header:{
      'content-type':'application/json'
    },
    success()
    {
      wx.showToast({
        icon:'none',
        title:'取消成功',
      })
    }
  })
  wx.redirectTo({
    url:'/pages/teacher/oper/sc/sc'
  })
},

  Back()
{
  wx.switchTab({
    url:'/pages/teacher/oper/opchoose'
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
      url:'http://127.0.0.1:5000/cdiffer',
      data:{
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
          th.setData({
            //@ts-ignore
            allc1:res.data[0],
            allc2:res.data[1],
          })
          console.log("1",th.data.allc1)
          console.log("2",th.data.allc2)
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
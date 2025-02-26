// pages/student/stuctr/change/change.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nkname:"",
    name:"",
    sex:"",
    sig:"",
    pic:"",
  },

NkNm(e:any)
{
  this.data.nkname=e.detail.value;
},
Name(e:any)
{
  this.data.name=e.detail.value;
},
Sex(e:any)
{
  this.data.sex=e.detail.value;
},
Sig(e:any)
{
  this.data.sig=e.detail.value;
},

Avtr()
{
  //var th=this;
  wx.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sizeType: ['original'],
    sourceType: ['album', 'camera'], 
    success(result) {
      console.log(result);
      wx.showToast({
        icon:'loading',
        title:'正在上传',
      })
      console.log(result.tempFiles[0].tempFilePath);
      wx.uploadFile({
        url: 'http://127.0.0.1:5000/stupiccg',
        filePath: result.tempFiles[0].tempFilePath,
        name:'pic',
        formData: {
          'sid':wx.getStorageSync("stuid")
        },
        success(res)
        {
          //@ts-ignore
          if(res.data='success')
          {
            wx.showToast({
              icon:'success',
              title:'修改成功',
            })
            setTimeout(() => {
              wx.redirectTo({url:'/pages/student/stuctr/change/change'})
            }, 300);
          }
          else{
            //@ts-ignore
            console.log(res.data)
            wx.showToast({
              icon:'error',
              title:'修改失败',
            })
          }
          
        }
      })
      //result.tempFiles[0].tempFilePath,
    },
  })
},


Cfm()
{
wx.request({
  url:'http://127.0.0.1:5000/sinfocg',
          data:{
            nkname:this.data.nkname,
            name:this.data.name,
            sex:this.data.sex,
            sig:this.data.sig,
            id:wx.getStorageSync('stuid'),
          },
          header:{
            'content-type':'application/json'
          },
          success(){
            wx.showToast({
              icon:'success',
              title:'修改成功',
            })
            setTimeout(() => {
              wx.redirectTo({url:'/pages/student/stuctr/change/change'})
            }, 300);
          }
})
},
Back()
{
  wx.switchTab({
    url:'/pages/student/stuctr/stuctr',
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
      url:'http://127.0.0.1:5000/sctr',
      data:{
        id:wx.getStorageSync('stuid')
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        th.setData({
          nkname:res.data[0][1],
          name:res.data[0][2],
          sex:res.data[0][3],
          pic:res.data[0][5],
          sig:res.data[0][4],
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
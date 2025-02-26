// pages/teacher/oper/teas/change/change.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    ttl:"",
    tel:"",
    pic:"",
    fdname:"",
    fdttl:"",
    fdtel:"",
      },
    
      Name(e:any)
      {
      this.data.name=e.detail.value;
      },
      Ttl(e:any)
      {
        this.data.ttl=e.detail.value;
      },
      Tel(e:any)
      {
        this.data.tel=e.detail.value;
      },
    
      Pic()
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
            url: 'http://127.0.0.1:5000/teacherpiccg',
            filePath: result.tempFiles[0].tempFilePath,
            name:'pic',
            formData: {
              'tid':wx.getStorageSync("cgtid")
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
                wx.redirectTo({
                  url:'/pages/teacher/oper/teas/change/change',
                })
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
      console.log("name",this.data.name);
      console.log("score",this.data.ttl);
      console.log("tm",this.data.tel);
    wx.request({
      url:'http://127.0.0.1:5000/teacherinfocg',
              data:{
                tid:wx.getStorageSync("cgtid"),
                name:this.data.name,
                ttl:this.data.ttl,
                tel:this.data.tel,
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
                  wx.redirectTo({
                    url:'/pages/teacher/oper/teas/teas',
                  })
                }, 300);
              }
    })
    },
    
    Back()
    {
      wx.redirectTo({
        url:'/pages/teacher/oper/teas/teas'
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
      url:'http://127.0.0.1:5000/teacherfd',
      data:{
        id:wx.getStorageSync('cgtid')
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        th.setData({
          fdname:res.data[1],
          fdttl:res.data[2],
          fdtel:res.data[3],
          pic:res.data[4],
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
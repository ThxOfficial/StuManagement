// pages/teacher/oper/teas/add/add.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:"",
    name:"",
    ttl:"",
    tel:"",
  },

  Tid(e:any)
  {
  this.data.tid=e.detail.value;
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

  Cfm()
  {
    var tid=this.data.tid;
    var name=this.data.name;
    var ttl=this.data.ttl;
    var tel=this.data.tel;
    if(tid&&name&&ttl&&tel)
    {
      wx.request({
        url:'http://127.0.0.1:5000/addteacher',
        data:{
          tid:tid,
          name:name,
          ttl:ttl,
          tel:tel,
        },
        header:{
          'content-type':'application/json'
        },
        method:'GET',
        success(res){
          console.log(res.data)
          if(res.data=='yes')
          {
            wx.showToast({
              icon:'success',
              title:'添加成功',
            })
            setTimeout(() => {
              wx.redirectTo({
                url:'/pages/teacher/oper/teas/teas',
              })
            }, 300);
          }
          else{
            wx.showToast(
              {
                icon:'error',
                title:'该教师已存在',
              }
            )
          }
        }
      })
    }
    else{
      wx.showToast(
        {
          icon:'error',
          title:'信息不完整',
        }
      )
    }
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
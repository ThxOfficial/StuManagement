// pages/teacher/oper/course/add/add.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",
    name:"",
    tm:"",
    score:"",
  },

  Cid(e:any)
  {
  this.data.cid=e.detail.value;
  },
  Name(e:any)
  {
  this.data.name=e.detail.value;
  },
  Tm(e:any)
  {
    this.data.tm=e.detail.value;
  },
  Score(e:any)
  {
    this.data.score=e.detail.value;
  },

  Cfm()
  {
    var cid=this.data.cid;
    var name=this.data.name;
    var score=this.data.score;
    var tm=this.data.tm;
    if(cid&&name&&score&&tm)
    {
      wx.request({
        url:'http://127.0.0.1:5000/addcourse',
        data:{
          cid:cid,
          name:name,
          score:score,
          tm:tm,
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
                url:'/pages/teacher/oper/course/course',
              })
            }, 300);
          }
          else{
            wx.showToast(
              {
                icon:'error',
                title:'课程号已存在',
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
      url:'/pages/teacher/oper/course/course'
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
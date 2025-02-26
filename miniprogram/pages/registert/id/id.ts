// pages/register/id/id.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  InputId(e:any)
  {
    this.data.id=e.detail.value;
    console.log(this.data.id);
  },

  Cfm()
  {
    var id=this.data.id;
    console.log("确认");
    
    if(id)
    {
      
      
      wx.request({
        url:'http://127.0.0.1:5000/tid',
        data:{
          id:this.data.id,
        },
        header:{
          'content-type':'application/json'
        },
        success(res){
          console.log("调用");
          console.log(res.data);
          //here
          if(res.data[0]=='no'&&res.data[1]=='yes')
      {
        wx.showToast(
          {
            icon:'none',
            title:'账号创建成功',
          }         
        )
        wx.redirectTo({
          url:'/pages/registert/pswd/pswd',
        })
        
      }
      else if(res.data[0]=='yes')
      {
        wx.showToast(
          {
            icon:'none',
            title:'账号已存在',
          }
        )
      }
      else if(res.data[0]=='no')
      {
        wx.showToast(
          {
            icon:'none',
            title:'账号格式不正确，必须为12位阿拉伯数字',
          }
        )
      }

        },
        method:'GET',
      })
    }
    else{
      wx.showToast(
        {
          icon:'none',
          title:'账号不能为空',
        }
      )
    }
  },

  Back()
  {
    wx.redirectTo({
      url:"/pages/logint/login"
    })
  },

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
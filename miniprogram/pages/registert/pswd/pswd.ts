// pages/register/pswd/pswd.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password1:"",
    password2:""
  },

  InputPswd1(e:any)
  {
    this.data.password1=e.detail.value;
    console.log(this.data.password1);
  },

  InputPswd2(e:any)
  {   
    this.data.password2=e.detail.value;
    console.log(this.data.password2);
    
  },

  Cfm()
  {
    var password1=this.data.password1;
    var password2=this.data.password2;
    console.log("确认");
    
    if(password1)
    {
      if(password2)
      {
        console.log(password1);
        console.log(password2);
        if(password2==password1)
          {
            wx.request({
              url:'http://127.0.0.1:5000/tpswd',
              data:{
                pswd:this.data.password1,
              },
              header:{
                'content-type':'application/json'
              },
              success(res){
                console.log("调用");
                console.log(res.data);
                //here
                if(res.data[0]=='long'&&res.data[1]=='yes')
            {
              wx.showToast(
                {
                  icon:'none',
                  title:'注册成功',
                }
              )
              setTimeout(() => {
                wx.redirectTo({
                  url:'/pages/logint/login',
                  })
                  console.log("跳转预备");
              }, 300);
              
              
            }
            
            else
            {
              wx.showToast(
                {
                  icon:'none',
                  title:'密码格式不正确',
                }
              )
              //之后在wxml加上密码需大于8位且应包含大小写，数字，符号
            }
      
              },
              method:'GET',
            })
              
              
          }
          else{
            wx.showToast(
              {
                icon:'none',
                title:'两次密码输入需一致',
              }
              )
          }      
      }
      else{
        wx.showToast(
          {
            icon:'none',
            title:'密码确认时不能为空',
          }
        )
      }
    }
    else{
      wx.showToast(
        {
          icon:'none',
          title:'密码不能为空',
        }
      )
    }
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
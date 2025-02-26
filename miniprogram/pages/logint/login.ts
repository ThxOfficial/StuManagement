

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    password:"",
    ck:"T",
    ICk:"",
    PCk:"",
  },

  InputId(e:any)
  {
    this.data.id=e.detail.value;
  },

  InputPswd(e:any)
  {   
    this.data.password=e.detail.value;
    
  },

  Cfm()
  {
    var id=this.data.id;
    var password=this.data.password;
    console.log("确认");
    
    if(id)
    {
      if(password)
      {
        console.log(id);
        console.log(password);
        wx.showToast(
          {
            icon:'none',
            title:'输入成功',
          }
        )
       /* wx.request({
          url:'http://127.0.0.1:5000/logint',
          data:{ 
            id:this.data.id,
            password:this.data.password,
          },
          header:{
            'content-type':'application/json'
          },
          method:'GET',
        })*/

        wx.request({
          url:'http://127.0.0.1:5000/logint',
          data:{ 
            id:this.data.id,
            password:this.data.password,
          },
          header:{
            'content-type':'application/json'
          },
          success(res){
            console.log("调用后端发前端");
            console.log(res.data[0]);
            console.log(res.data[1]);
            console.log(res.data[2]);
            
            
            if(res.data[0]=='yes'&&res.data[1]=='yes'&&res.data[2]=='yes')
        {
          wx.showToast(
            {
              icon:'none',
              title:'登录成功',
            }
          )
          wx.setStorageSync('roleId',1)
          wx.setStorageSync('teaid',id)
          //挪走
          wx.navigateTo({
            url:'/pages/captcha/captcha',
          })
          console.log("跳转预备");
        }
        else if(res.data[1]=='no')
        {
          wx.showToast(
            {
              icon:'none',
              title:'账号不存在',
            }
          )
        }
        else if(res.data[2]=='no')
        {
          wx.showToast(
            {
              icon:'none',
              title:'密码错误',
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
            title:'密码不能为空',
          }
        )
      }
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
ToRe()
{
  console.log("转注册");
  wx.redirectTo({
    url:'/pages/registert/id/id',
  })
  
},

Back()
{
wx.redirectTo({
  url:"/pages/chooseppl/chooseppl",
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
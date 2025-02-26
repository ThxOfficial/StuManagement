// pages/student/camara/camara.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad() {
    //@ts-ignore
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    //@ts-ignore
    this.ctx.takePhoto({
      quality: 'high',
      //@ts-ignore
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  startRecord() {
    //@ts-ignore
    this.ctx.startRecord({
      //@ts-ignore
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    //@ts-ignore
    this.ctx.stopRecord({
      //@ts-ignore
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  //@ts-ignore
  error(e) {
    console.log(e.detail)
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
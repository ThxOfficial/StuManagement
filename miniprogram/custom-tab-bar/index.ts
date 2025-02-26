// custom-tab-bar/index.ts
import {StuList,TeaList} from '../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    
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



interface BList{ 
  pagePath: string 
  text: string
  iconPath: string
  selectedIconPath: string
}

Component({
  
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list:[] as BList[],
  },
  attached() {
    let roldId = wx.getStorageSync('roleId');
    console.log(roldId)
    // 0 表示普通用户 1表示管理员
    if(roldId == 0){
      this.setData({
        list: StuList,
      })
    }else if(roldId == 1){
      this.setData({
        list: TeaList,
      })
    }else{
      this.setData({
        list: StuList
      })
    }
  },
  methods: {
    switchTab(e: { currentTarget: { dataset: any } }) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})

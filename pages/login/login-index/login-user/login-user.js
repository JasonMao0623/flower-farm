// pages/login/login-index/login-user/login-user.js
Page({
  data:{
    leveled:[1,1,0]
  },
  onLoad:function(options){
    this.getUserInfor();
  },
  getUserInfor:function(){
    var that=this;
    wx.getUserInfo({
      success: function(res){
        var userInfor=res.userInfo;
        that.setData({
          user:{
            name:userInfor.nickName,
            userLogo:userInfor.avatarUrl
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
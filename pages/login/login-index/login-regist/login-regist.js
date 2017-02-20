// pages/login/login-index/login-regist/login-regist.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onVerTap:function(){
    wx.request({
      url: 'https://eco.taobao.com/router/rest',
      data: {
        method:"AlibabaAliqinFcSmsNumSendRequest",
        app_key:"23639192",
        sign_method:"hmac",
        timestamp:"2017-02-16 21:02:00",
        v:"2.0",
        sms_type:"normal",
        sms_free_sign_name:"阿里大鱼",
        rec_num:"18052803111",
        sms_template_code:"SMS_585014"
      },
      method: 'GET',
      success: function(res){
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
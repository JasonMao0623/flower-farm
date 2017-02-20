// pages/lease-detail/lease-detail.js
var leaseData = require("../../data/leaseData.js");
var app=getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    var index = options.id;
    var star=leaseData.leaseData[index].star;
    this.setData({
      leaseData: leaseData.leaseData[index],
      num: 1,
      stared:app.processStar(star)
    })
  },
  onOperatorTap: function (event) {
    var operator = event.currentTarget.dataset.operator;
    switch (operator) {
      case "-":
        var num = this.data.num;
        //app有bug
        if(num>0){
          num--;
        this.setData({
          num: num
        });
        }
        break;
      case "+":
        var num = this.data.num;
        num++;
        this.setData({
          num: num
        });
        break;
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
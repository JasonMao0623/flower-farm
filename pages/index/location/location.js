// pages/location/location.js
var app = getApp();
var wholeCities = require("../../../data/wholeCityData.js");
Page({
  data: {
    locationCity:"北京",
    isSearching: false,
    notSearching: true
  },
  onLoad: function (options) {
    app.getLocation(this.processLocation);
    this.setData({
      wholeCities: wholeCities.cities
    })
  },
  processLocation: function (res) {
    var locationCity = res.data.showapi_res_body.addressComponent.city;
    locationCity = locationCity.substring(0, locationCity.length - 1)
    this.setData({
      locationCity: locationCity
    })
  },
  onCityTap: function (event) {
    var city = event.currentTarget.dataset.city;
    wx.setStorageSync('currentCity', city)
    wx.switchTab({
      url: '../../index/index'
    })
  },
  onInputChange: function (event) {
    var value = event.detail.value;
    this.setData({
      isSearching: true,
      notSearching: false
    })
    var hasThisCity = wholeCities.initialCity.indexOf(value);
    if (hasThisCity > -1) {
      for (var i = hasThisCity; i++; i < wholeCities.initialCity.length) {
        if (wholeCities.initialCity.charAt(i) == "市") {
          break;
        }
        var index = i;
      }
      // console.log(hasThisCity);
      // console.log(index);
      var searchCity = wholeCities.initialCity.substring(hasThisCity, index + 1)
      this.setData({
        searchCity: searchCity
      })
    } else {
      wx.showModal({
        title: '注意！搜索支持地级及以上城市！',
        content: '没有这个城市，请重新输入！',
      })
    }
  },
  onCancleTap:function(){
    this.setData({
      isSearching: false,
      notSearching: true
    })
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
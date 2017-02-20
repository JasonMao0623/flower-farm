// pages/index/index.js
var app = getApp();
var activesData = require("../../data/activeData.js");
var leaseData = require("../../data/leaseData.js");
var plantData = require("../../data/plantData.js");
var fansData = require("../../data/fansData.js");
var shareData = require("../../data/shareData.js");
var helpData = require("../../data/helpData.js");
var farmData = require("../../data/farmData.js");
var ringData = require("../../data/ringData.js");
Page({
  data: {
    navImgs: [
      "/images/nav/nav1.jpeg",
      "/images/nav/nav2.jpeg",
      "/images/nav/nav3.jpeg",
      "/images/nav/nav4.jpeg",
      "/images/nav/nav5.jpeg",
      "/images/nav/nav6.jpeg",
    ]
  },
  onLoad: function (options) {
    //初始数据处理
    this.processLevelToLeveled(plantData.plantData);
    this.processLevelToLeveled(fansData.fansData);
    this.processLevelToLeveled(shareData.shareData);
    this.processStarToStared(farmData.farmData);
    //设置缓存
    // var collectedStorge = wx.getStorageSync('collectedStorge');
    // if (!collectedStorge) {
    //   var collected = {};
    //   this.setCollectedData("lease", leaseData.leaseData, collected);
    //   this.setCollectedData("farm", farmData.farmData, collected);
    //   this.setCollectedData("plant", plantData.plantData, collected);
    //   this.setCollectedData("fans", fansData.fansData, collected);
    //   this.setCollectedData("share", shareData.shareData, collected);
    //   this.setCollectedData("help", helpData.helpData, collected);
    //   this.setCollectedData("active", activesData.activesData, collected);
    //   this.setCollectedData("ring", ringData.ringData, collected);
    // } else {
    //   this.setData({
    //     collectedData: collectedStorge
    //   })
    // }
    this.setData({
      activeData: activesData.activeData,
      leaseData: leaseData.leaseData,
      plantData: plantData.plantData,
      fansData: fansData.fansData,
      shareData: shareData.shareData,
      helpData: helpData.helpData,
      farmData: farmData.farmData,
      ringData: ringData.ringData,
      isShow: {
        active: true,
        lease: false,
        plant: false,
        fans: false,
        share: false,
        help: false,
        farm: false,
        ring: false
      }
    })
  },
  //处理数组
  processLevelToLeveled: function (array) {
    //调用app的processLevel方法将level转化成数组
    for (var index in array) {
      var level = array[index].level;
      array[index].leveled = app.processLevel(level);
    }
  },
  //处理数组
  processStarToStared: function (array) {
    //调用app的processLevel方法将level转化成数组
    for (var index in array) {
      var star = array[index].star;
      array[index].stared = app.processStar(star);
    }
  },
  //位置处理函数
  processLocation: function (res) {
    var city = "";
    var locationCity = res.data.showapi_res_body.addressComponent.city;
    locationCity = locationCity.substring(0, locationCity.length - 1)
    if (this.data.currentCity) {
      city = this.data.currentCity
    } else {
      city = locationCity
    }
    this.setData({
      city: city,
    })
  },
  onCityTap: function () {
    wx.navigateTo({
      url: 'location/location',
    })
  },
  onScanTap: function () {
    wx.scanCode({
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        console.log("222")
      }
    })
  },
  onMenuTap: function (event) {
    var that = this;
    var menu = event.currentTarget.dataset.menu;
    switch (menu) {
      case "1":
        that.setIsShowData("lease");
        break;
      case "2":
        that.setIsShowData("active");
        break;
      case "3":
        that.setIsShowData("plant");
        break;
      case "4":
        that.setIsShowData("fans");
        break;
      case "5":
        that.setIsShowData("share");
        break;
      case "6":
        that.setIsShowData("help");
        break;
      case "7":
        that.setIsShowData("farm");
        break;
      case "8":
        that.setIsShowData("ring");
        break;
    }
  },
  setIsShowData: function (index) {
    var isShow = {
      lease: true,
      active: false,
      plant: false,
      fans: false,
      share: false,
      help: false,
      farm: false,
      ring: false
    }
    for (var i in isShow) {
      isShow[i] = false;
    }
    isShow[index] = true;
    this.setData({
      isShow: isShow
    })
  },
  onImageTap: function (event) {
    var src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src],
    })
  },
  onMenuChildTap: function (event) {
    var id = event.currentTarget.dataset.id;
    var category = event.currentTarget.dataset.category;
    switch (category) {
      case "lease":
        wx.navigateTo({
          url: '../lease-detail/lease-detail?id=' + id,
        })
        break;
      case "active":
        wx.navigateTo({
          url: '../active-detail/active-detail?id=' + id,
        })
    }
  },
  onCollectTap: function (event) {
    var id = event.currentTarget.dataset.id;
    var category = event.currentTarget.dataset.category;
    console.log(category)
    switch (category) {
      case "lease":
        this.categoryTap(id, this.data.leaseData);
        console.log(this.categoryTap(id, this.data.leaseData));
        this.setData({
          leaseData: this.categoryTap(id, this.data.leaseData)
        })
        break;
      case "active":
        this.categoryTap(id, this.data.activeData);
        console.log(this.categoryTap(id, this.data.activeData));
        this.setData({
          activeData: this.categoryTap(id, this.data.activeData)
        })
    }
  },
  //设置collecttap公共函数
  categoryTap: function (id, cateGory) {
    var collected = cateGory[id].collected;
    if (collected) {
      collected = !collected;
      cateGory[id].collected = collected;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 2000
      });
      return cateGory;
    } else {
      collected = !collected;
      cateGory[id].collected = collected;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
      return cateGory;
    }
  },
  // onCollectTap: function (event) {
  //   var id = event.currentTarget.dataset.id;
  //   this.publicCollectTap(id,"lease");
  // },
  // //设置collecttap公共函数
  // publicCollectTap: function (id,cateGory) {
  //   var isCollected = this.data.collectedData[cateGory][id];
  //   console.log(isCollected);
  //   if (!isCollected) {
  //     isCollected = !isCollected;
  //     this.data.collectedData[cateGory][id]= isCollected;
  //     this.setData({
  //       collectedData: this.data.collectedData
  //     })
  //     wx.showToast({
  //       title: '收藏成功',
  //       icon: 'success',
  //       duration: 1000
  //     })
  //   } else {
  //     isCollected = !isCollected;
  //     this.data.collectedData[cateGory][id]= isCollected;
  //     this.setData({
  //       collectedData: this.data.collectedData
  //     })
  //     wx.showToast({
  //       title: '取消收藏',
  //       icon: 'success',
  //       duration: 1000
  //     })
  //   }
  // },
  //设置收藏函数
  // setCollectedData: function (cateGory, DataName, collectedStorge) {
  //   var array = [];
  //   for (var index in DataName) {
  //     var collected = DataName[index].collected;
  //     array.push(collected);
  //   }
  //   collectedStorge[cateGory] = array;
  //   wx.setStorageSync('collectedStorge', collectedStorge);
  //   this.setData({
  //     collectedData: collectedStorge
  //   });
  // },
  onReady: function () {
    //页面渲染完成
  },
  onShow: function () {
    var currentCity = wx.getStorageSync('currentCity');
    this.setData({
      currentCity:currentCity
    });
    app.getLocation(this.processLocation);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
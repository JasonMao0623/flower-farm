var activeData = require("../../data/activeData.js");
var app=getApp();
Page({
  data:{
    changePeopleNum:false
  },
  onLoad:function(options){
    var id=options.id;
    console.log(id);
    var star=activeData.activeData[id].star;
    console.log(star);
    this.setData({
      activeData:activeData.activeData[id],
      stared:app.processStar(star)
    })
  },
  onChangeTap:function(event){
    this.setData({
      changePeopleNum:true
    })
  },
  onAdultLeaseTap:function(){
    var num=this.data.activeData.peopleNum.adult;
    this.leaseFunction(num,"adult");
  },
  onAdultAddTap:function(){
    var num=this.data.activeData.peopleNum.adult;
    this.addFunction(num,"adult");
  },
  onChildLeaseTap:function(){
    var num=this.data.activeData.peopleNum.child;
    this.leaseFunction(num,"child");
  },
  onChildAddTap:function(){
    var num=this.data.activeData.peopleNum.child;
    this.addFunction(num,"child");
  },
  onxXTap:function(event){
    var cost=(this.data.activeData.peopleNum.adult +this.data.activeData.peopleNum.child)*this.data.activeData.eachCost;
    this.data.activeData.cost="¥"+cost;
    this.setData({
      changePeopleNum:false,
      activeData:this.data.activeData
    })
  },
  leaseFunction:function(num,people){
    if(num>0){
      num--;
      this.data.activeData.peopleNum[people]=num;
      this.setData({
        activeData:this.data.activeData
      })
    }
  },
  addFunction:function(num,people){
      num++;
      this.data.activeData.peopleNum[people]=num;
      this.setData({
        activeData:this.data.activeData
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
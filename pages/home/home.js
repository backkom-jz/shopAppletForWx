// pages/home/home.js
import {Home} from 'home-model.js';
var home = new Home();
Page({
    /**
     * 页面的初始数据
     */
    data: {
      loadingHidden: false
    },
    onLoad:function(){
      this._loadData();
    },
    _loadData:function(){
      var id = 1;
      var data = home.getBannerData(id,(res)=>{
        console.log(res); 
        // 没有dom 只有数据绑定
        this.setData({
          'bannerArr':res
        })
      });

      var themeData = home.getThemeData((res)=>{
        this.setData({
          'themeArr':res
        })
      });

      var productsData = home.getProductsData((res)=>{
        this.setData({
          'productsArr':res
        })
      });
    },
    /*跳转到商品详情*/
    onProductsItemTap: function (event) {
      var id = home.getDataSet(event, 'id');
      wx.navigateTo({
          url: '../product/product?id=' + id
      })
    },

     /*跳转到主题列表*/
     onThemesItemTap: function (event) {
      var id = home.getDataSet(event, 'id');
      var name = home.getDataSet(event, 'name');
      wx.navigateTo({
          url: '../theme/theme?id=' + id+'&name='+ name
      })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function(){
      this._loadData(()=>{
          wx.stopPullDownRefresh()
      });
  },

  //分享效果
  onShareAppMessage: function () {
      return {
          title: '零食商贩 Pretty Vendor',
          path: 'pages/home/home'
      }
  }
})

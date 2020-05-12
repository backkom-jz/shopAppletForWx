import { Config } from '../utils/config.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.resetUrl;
  }
  request(params){
    var url = this.baseRequestUrl + params.url;
    if(!params.type){
      params.type = 'GET';
    }
    wx.request({
      url: url,
      data:params.data,
      method:params.type,
      header:{
        'content-type':"application/json",
        'token':wx.getStorageSync('token')
      },
      success:function(res){
        // if(params.sCallBack){
        //   params.sCallBack(res);
        // }
        params.sCallback&&params.sCallback(res.data);
      },
      fail:function(err){
        console.log(err)
      }
    })
  }

  _processError(err){
    console.log(err);
}

_refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
        this.request(param, true);
    });
}

/*获得元素上的绑定的值*/
getDataSet(event, key) {
    return event.currentTarget.dataset[key];
};
}

export {Base};
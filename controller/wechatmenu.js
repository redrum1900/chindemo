var WechatApi = require('wechat-api') 
var config = {
    "app_id": "wx04014b02asdsfdsfsf",
    "app_secret": "cc4c224b50fkjlksdafkldfsakljsdfk",
    "wx_menu": {
      "button": [
        {
          "name": "菜单",
          "sub_button": [
            {
              "type": "view",
              "name": "资讯菜单",
              "url": "http://ip:port/all"
            }
          ]
        },
        {
          "name": "菜单2",
          "sub_button": [
            {
              "type": "view",
              "name": "我的11",
              "url": "http://ip:port/all"
            }
          ]
        },
        {
          "name": "助理",
          "sub_button": [
            {
              "type": "view",
              "name": "大学",
              "url": "http://ip:port/all"
            },
            {
              "type": "view",
              "name": "社区",
              "url": "http://ip:port/all"
            }
          ]
        }
      ]
    }
  };

var menu_config = config.wx_menu;
var app_id      = config.app_id;
var app_secret  = config.app_secret;

var api = WechatApi(app_id,app_secret);

function app(){
  api.createMenu(menu_config, function(err, result){
    console.log(result);
  });
}

module.exports = app;

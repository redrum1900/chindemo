var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var wechat = require('wechat');
var token = "ushinchin"; //此处需要你自己修改！

var config = {
  token: 'ushinchin',
  appid: 'aa45f82c8ad36068f4dc451195edebfa',
  encodingAESKey: 'sCiOMpLRU40ebQiBfNyGVvoPqVogRhcqfEoc6Ed2NmM'
};

router.get('/getwechat',function(req, res, next){
	var signature = req.query.signature;
	console.log(signature);
   var timestamp = req.query.timestamp;
   console.log(timestamp);
   var nonce = req.query.nonce;
   console.log(nonce);
   var echostr = req.query.echostr;
   console.log(echostr);
   /*  加密/校验流程如下： */
   //1. 将token、timestamp、nonce三个参数进行字典序排序
   var array = new Array(token,timestamp,nonce);
   array.sort();
   var str = array.toString().replace(/,/g,"");
   //2. 将三个参数字符串拼接成一个字符串进行sha1加密
   var sha1Code = crypto.createHash("sha1");
   var code = sha1Code.update(str,'utf-8').digest("hex");
   //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
   if(code === signature){
      res.send(echostr)
   }else if(code == signature){
      res.send(echostr)
   }else
   {
      res.send('error');
   }
});

router.get('/getdata',function(req, res, next){
	res.send('no data');
})

router.use(express.query());
router.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.Content === '2b') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.MsgType === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

module.exports = router;
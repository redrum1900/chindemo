var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/gnsb', function(req, res, next) {
	var obj ={
		a:'高宁傻逼';
		s:'对'
	}
  res.send(obj);});

module.exports = router;

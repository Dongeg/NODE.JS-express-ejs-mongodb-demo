var express = require('express');
var router = express.Router();
var firstblood = require('../mongodb/firstblood_schema.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '管理员登陆' });
});



router.post('/index',function(req,res,next){
  //接受前端数据
  var query = {
  	user: req.body.user, 
  	password: req.body.password
    };
  //返回符合条件的文档数
  firstblood.userlist.count(query, function(err, doc){ 
    if (doc==1) {
      var findResult = firstblood.userlist.find(function(error, result){
        if (error) {
          res.send(error);
        }else{
          res.render('index', {
            title : '后台',
            status: doc,
            username : query.user,
            adminlist : result,
            date : new Date()
          });
        }
      });
    }else{
      res.render('index', {
        title : '后台',
        status: doc,
      });
      //res.redirect('/');
    }
  });
})
module.exports = router; 

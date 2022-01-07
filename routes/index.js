var express = require('express');
var router = express.Router();

//首頁js
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!!!'});
});

module.exports = router;

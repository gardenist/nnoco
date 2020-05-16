var express = require('express');
var router = express.Router();


router.get('/flash', function(req, res) {
  req.session.message = '이 메시지는 세션에 담긴 메시지입니다.';
  req.flash('message', 'Flash 메시지');

  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req, res) {
  res.send(`${req.session.message} ${req.flash('message')}`);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 가독성
function a(a1, a2, a3) {
  if(a > a3) {
    for(let i in a2) {
      
    }
  }
}

router.get('/list', function(req, res, next) {
  console.log('첫 번째 list', req.secret);
  let data = [
    { 
      user: 'nnoco'
    }
  ];

  // res.json(data);

  next();
})

router.get('/list', function(req, res) {
  console.log('두 번째 list');
  let data = [
    { 
      user: 'nnoco'
    }
  ];

  // node plain http 버전
  // res.write(JSON.stringify(data));
  // res.writeHead({
  //   'Content-Type': 'application/json'
  // })

  // express
  res.json(data);

})

module.exports = router;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 나만의 미들웨어
app.use(function(req, res, next) {
  console.log(req.url, '저도 미들웨어입니다.');
  next();
});

app.use(logger('dev')); // 'short', 'common', 'combined'
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash());

// my-static.html
app.use(express.static(path.join(__dirname, 'public')));

// 우리의 비밀 미들웨어
// req 객체에 secret 이라는 프로퍼티를 추가해주기!
app.use(function(req, res, next) {
  req.secret = 'nnoco';

  console.dir(req.session.nickname);
  req.session.nickname = 'nnoco';

  next();
});

app.use('/', function(req, res, next) {
  console.log('첫 번째 미들웨어입니다.');
  next();
}, function(req, res, next) {
  console.log('두 번째 미들웨어입니다.');
  next();
}, function(req, res, next) {
  console.log('세 번째 미들웨어입니다.');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// SSR Server Side Rendering
// 화면에 보여질 HTML이 모두 서버에서 다 작성된 후에 응답
// 일부 화면, Javascript
// 렌더링 -> Javascript
// SPA Single Page Application
// error handler

// next.js
// gatsby - react 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

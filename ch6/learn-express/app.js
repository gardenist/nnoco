var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 우리의 비밀 미들웨어
// req 객체에 secret 이라는 프로퍼티를 추가해주기!
app.use(function(req, res, next) {
  req.secret = 'nnoco';

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

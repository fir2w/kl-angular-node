'use strict';


var kraken = require('kraken-js'),
  express = require('express'),
  db = require('./lib/database'),
  passport = require('passport'),
  auth = require('./lib/auth'),
  io = require('socket.io'),
  flash = require('connect-flash'),
  app = {},
  logger = null;

app.configure = function configure(nconf, next) {

  // Async method run on startup.
  if (process.env.NODE_ENV == 'production') {//产品模式下
    db.config(nconf.get('database').production);//配置数据库连接
  }
  if (process.env.NODE_ENV == 'dev') {//开发模式下
    db.config(nconf.get('database').dev);//配置数据库连接
  }
  require('./lib/passport')(passport, nconf.get('social'));//初始passprot
  logger = require('./lib/log').logger();
  next(null);
};


app.requestStart = function requestStart(server) {
  server.engine('.html', require('ejs').renderFile);

};

var getCsrfValue = function (req) {//增加可以读取angular的token
  var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
  logger.debug('得到token------------------' + token);
  return token;
};

app.requestBeforeRoute = function requestBeforeRoute(server) {
  server.use(function (req, res, next) {
    logger.debug("请求地址-------------" + req.path);
    logger.debug("请求url-------------" + req.url);
    //console.log(req.headers);
    next();
  });
  // Fired before routing occurs
  server.use(express.methodOverride());
  //

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(flash());
  server.use(auth.injectUser);

  //server.use(express.cookieSession());
  if (process.env.NODE_ENV == 'production') {
    server.use(express.csrf({value: getCsrfValue}));//识别
    server.use(function (req, res, next) {//把_csrf放到cookie中，让angluar识别
      //res.cookie('XSRF-TOKEN', req.csrfToken());
      var token = req.csrfToken();
      res.cookie('XSRF-TOKEN', token);
      logger.debug('产生下一个XSRF-TOKEN------------------' + token);
      next();
    });
  }

};


app.requestAfterRoute = function requestAfterRoute(server) {

};

if (require.main === module) {//为了测试需要
  kraken.create(app).listen(function (err,server) {
    if (err) {
      console.error(err);
    }
    var io = require('socket.io').listen(server);//支持socket.io
    io.sockets.on('connection', require('./controllers/socket'));
  });

}

module.exports = app;
'use strict';

var LoginModel = require('../models/login'),
  passport = require('passport'),
  auth = require('../lib/auth'),
  logger = require('../lib/log').logger(),
  User = require('../models/userModel');

module.exports = function (app) {

  var model = new LoginModel();

  //检查是否登录
  app.get('/checklogged', function (req, res) {

    if (req.isAuthenticated()) {//已经授权
      res.send(req.user);
    } else {
      if (req.cookies.autologin) {//自动登录
        var userData = new Buffer(req.cookies.autologin, 'base64').toString();
        if (userData) {
          userData = JSON.parse(userData);
          User.validUserLoginByPwd(userData.u, userData.p, function (err, user) {
            if (err) {
              res.send('0');
            } else {
              req.login(user, function (err2) { //req.user  password
                if (err2){
                  res.send('0');
                }else {
                  res.send(user);
                }
              });
            }
          });

        } else {
          res.send('0');
        }
      }
    }

  });

  //提交登陆,没有get,则通过返回401,由前台进行控制
  app.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    //更新cookie
    var data = {};
    data.u = user.id_;
    data.t = Date.now();
    //data.h = user.hash_;
    data.p = user.pwd_;
    var cookData = new Buffer(JSON.stringify(data)).toString('base64');

    res.cookie('autologin', cookData, {//3天过期
      maxAge: 259200000,
      path: '/',
      httpOnly: true
    });

    res.send(req.user);
  });

  //提交登陆,没有get,则通过返回401,由前台进行控制
  app.get('/profile', passport.authenticate('local'), function (req, res) {
    res.render('templates/profile');
  });

  //注销
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  /**
   *  提交注册,
   *  如果邮件已经存在,返回
   */
  app.post('/register', auth.userExist, function (req, res, next) {
    User.signup(req.body.email, req.body.password, function (err, user) {
      if (err)
        throw err;
      req.login(user, function (err) { //req.user  password
        if (err)
          return next(err);
        return res.json(user);
      });
    });
  });

  app.get('/auth/weibo', passport.authenticate('sina', {
    scope: 'email'
  })); //需要

  app.get('/ks/user/weibo-login',
    passport.authenticate('sina', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      res.render('profile', {
        user: req.user
      });
    });

  app.get('/auth/qq',
    passport.authenticate(
      'qq', {
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }));

  app.get('/auth/qq/callback',
    passport.authenticate('qq', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

};

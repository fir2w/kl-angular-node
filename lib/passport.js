var LocalStrategy = require('passport-local').Strategy
  , WeiboStrategy = require('passport-sina').Strategy
  , QQStrategy = require('passport-qq').Strategy
  , User = require('../models/userModel');


module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user.id_);
  });

  passport.deserializeUser(function (id, done) {//
      User.find(id).success(function (user) {
        done(null, user);
      });
    }
  );

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.isValidUserPassword(email, password, done);
      //可以记录用户登录日志
    }));

  // console.log("sdfsdfsdf" + config);

  passport.use(new WeiboStrategy({
      clientID: config.sina.clientID,
      clientSecret: config.sina.clientSecret,
      callbackURL: config.sina.callbackURL,
      requireState: false
    },
    function (accessToken, refreshToken, profile, done) {//回调成功
      profile.authOrigin = 'sina';
      User.findOrCreateOAuthUser(profile, function (err, user) {//保存用户
        return done(err, user);
      });
    }));

  passport.use(new QQStrategy({
      clientID: config.qq.clientID,
      clientSecret: config.qq.clientSecret,
      callbackURL: config.qq.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      profile.authOrigin = 'qq';
      User.findOrCreateOAuthUser(profile, function (err, user) {
        return done(err, user);
      });
    }
  ));
};

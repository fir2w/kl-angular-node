var hash = require('../lib/util/hash');
var Sina = require('./sinaModel');
var QQ = require('./qqModel');
var async = require('async');
var tools = require('../lib/util/tools.js');

var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');

var User = db.define('User', {
    id_: {type: DataTypes.STRING(64), primaryKey: true, unique: true},
    rev_: DataTypes.INTEGER,
    first_: DataTypes.STRING,
    last_: DataTypes.STRING,
    email_: DataTypes.STRING,
    pwd_: DataTypes.STRING,
    picture_id_: DataTypes.STRING(64),
    hash_: DataTypes.STRING,
    screen_name_: DataTypes.STRING,
    login_name_: DataTypes.STRING,
    create_at_: DataTypes.DATE,
    update_at_: DataTypes.DATE
  }, {
    tableName: 'act_id_user'
  }
);

module.exports = User;

//注册
User.signup = function (email, password, done) {
  hash(password, function (err, salt, hash) {//2个参数
    if (err) throw err;
    // if (err) return done(err);
    User.create({
      id_: tools.getUUID(),
      email_: email,
      pwd_: salt,
      hash_: hash.toString('base64')
    }).success(function (user) {
        done(null, user);
      }).error(function (err) {
        throw err;
      });
  });
};


User.isValidUserPassword = function (email, password, done) {
  User.find({ where: {email_: email} }).success(function (user) {
    if (!user) return done(null, false, { message: 'Incorrect email.' });
    //console.log('xxxx:' + JSON.stringify(user));

    hash(password, user.pwd_, function (err, hash) {//把用户的密钥传给
      if (err) return done(err);
      if (hash.toString('base64') == user.hash_) return done(null, user);
      done(null, false, {
        message: 'Incorrect password'
      });
    });
  }).error(function (err) {
      throw err;
    });
};

User.validUserLoginByPwd = function (userId, password, done) {
  User.find({ where: {id_: userId} }).success(function (user) {
    if (!user) return done(null, false, { message: '没有这个人.' });
    //console.log('xxxx:' + JSON.stringify(user));
    if(user.pwd_ == password){
      return done(null, user);
    }else {//密码不匹配
      done(null, false, {
        message: 'Incorrect password'
      });
    }
  }).error(function (err) {
    throw err;
  });
};

// Create a new user given a profile
User.findOrCreateOAuthUser = function (profile, done) {
  //logger.debug('profile.....' + profile);
  var User = this;
  var query = {id: profile.id};
  Sina.findOne(query, function (err, sinaUser) {
    if (sinaUser) {//如果已经注册
      async.waterfall([
        function (cb) {//则更新sinaUser
          /*var data = {
           name: profile.name,
           screen_name: profile.screen_name,
           location: profile.location,
           url: profile.url,
           profile_image_url: profile.profile_image_url,
           gender: profile.gender,
           followers_count: profile.followers_count,
           friends_count: profile.friends_count,
           statuses_count: profile.statuses_count,
           favourites_count: profile.favourites_count
           };*/
          /*sinaUser.name = profile.name;
           sinaUser.screen_name = profile.screen_name;
           sinaUser.friends_count = profile.gender;*/
          var copyFiles = ['name', 'screen_name', 'url', 'gender', 'profile_image_url', 'location', 'followers_count', 'friends_count', 'statuses_count', 'favourites_count'];
          //tools.copySpecialValue(sinaUser,profile,copyFiles);
          tools.copyValue(sinaUser, profile);
          sinaUser.save(
            function (err, number) {
              cb(err, sinaUser);//仍然把用户传过去
            });
        },
        function (sinaUser, cb) {
          User.findOne({_id: sinaUser.user_id}, function (err, user) {
            cb(err, user);//
          });
        }
      ],
        function (err, results) {
          done(null, results);
        });
    } else {//第一次登录
      async.waterfall([
        function (cb) {//同时创建一个同名的用户
          var user = {
            name: profile.name,
            firstName: profile.name,
            lastName: profile.name,
            handlerStatus: '0',
            profile_image_url: profile.profile_image_url
          };
          User.create(
            user,
            function (err, user) {
              cb(err, user);
            });
        },
        function (user, cb) {//则保存sinaUser
          sinaUser = {
            id: profile.id,
            user_id: user._id,
            name: profile.name,
            screen_name: profile.screen_name,
            location: profile.location,
            url: profile.url,
            profile_image_url: profile.profile_image_url,
            gender: profile.gender,
            followers_count: profile.followers_count,
            friends_count: profile.friends_count,
            statuses_count: profile.statuses_count,
            favourites_count: profile.favourites_count
          };
          Sina.create(
            sinaUser,
            function (err, sinaUser) {
              cb(err, user);//仍然把用户传过去
            });
        }],
        function (err, results) {
          done(null, results);
        });
    }
  });


};

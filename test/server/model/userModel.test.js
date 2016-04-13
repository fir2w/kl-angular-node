/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var request = require('supertest'),
  tools = require('../../../lib/util/tools.js');
var should = require('should');
var User = require('../../../models/userModel');


describe('User', function () {

  it('userSave', function (done) {
    var user = User.build({login_name_: 'ww', id_: tools.getUUID(), screen_name_: '张三'});
    user.save().error(function (err) {
      done(err);
    }).success(function (user) {
        user.destroy().success(function () {
          done();
        });
      });
  });

  it('登陆', function (done) {
    User.signup('ww@126.com', '123456', function (err, user) {
      if (err) throw err;
      user.should.have.property('email_', 'ww@126.com');
      User.isValidUserPassword('ww@126.com', '123456', function (err, result) {
        //console.log(JSON.stringify(newUser));
        result.should.be.ok;
        user.destroy().success(function () {
          done();
        });
      });
    });
  });
});
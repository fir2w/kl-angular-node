/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../../../index'),
  kraken = require('kraken-js'),
  request = require('supertest'),
  should = require('should'),
  Team = require('../../../models/teamModel'),
  cleanDB = require('../../lib/cleanDB.js')();


describe('LoginCtrl', function () {

  var mock;


  beforeEach(function (done) {
    kraken.create(app).listen(function (err, server) {
      mock = server;
      done(err);
    });
  });

  afterEach(function (done) {
    mock.close(done);
  });


  it('注册的保存', function (done) {
    var nrequest = request(mock);
    var email = 'user5@126.com';
    nrequest
      .post('/register')
      .send({ email: email, 'password': '123456'})//怎么模拟token
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        console.log(JSON.stringify(user));
        user.should.have.property('email_', email);

        /* var pUser = nrequest.user;
         pUser.should.have.property('email_', email);*/
        //
        done(err);
      });

  });

  it('用户登陆', function (done) {
    var nrequest = request(mock);
    var email = 'user1@126.com';
    var user = { email: email, 'password': '123456'};
    nrequest
      .post('/login')
      .send(user)//怎么模拟token
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        console.log(JSON.stringify(user));
        user.should.have.property('email_', email);

        /* var pUser = nrequest.user;
         pUser.should.have.property('email_', email);*/
        //
        done(err);
      });

  });

});
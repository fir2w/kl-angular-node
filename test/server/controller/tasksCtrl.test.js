/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../../../index'),
  db = require('../../../lib/database'),
  kraken = require('kraken-js'),
  request = null,
  should = require('should');
var login = require('../../lib/userLoginHandle.js');
var cleanDB = require('../../lib/cleanDB.js')();

describe('TeamCtrl', function () {

  var mock;
  var agent;

  beforeEach(function (done) {
    console.log('teamCtrl login..................');
    kraken.create(app).listen(function (err, server) {
      mock = server;
      request = require('supertest')(server);
      //user1@126.com进行登录
      login.login(request, function (loginAgent) {
        agent = loginAgent;
        done();
      });
    });
  });


  afterEach(function (done) {
    mock.close(done);
  });


  /*xit('允许访问', function (done) {
   var req = request.get('/profile');
   agent.attachCookies(req);
   req.expect(200, done);
   });*/

  it('用户管理下的team', function (done) {
    var req = request.get('/userId1/tasks/inbox');
    agent.attachCookies(req);//user1@126.com,有一个组
    req.expect(200)
      .end(function (err, res) {
        var tasks = res.body.data;
        console.log(tasks);
        done(err);
      });
  });


  it('查询某个用户的任务', function (done) {
    var req = request.get('/task-engine/tasks?assignee=userId1');
    agent.attachCookies(req);//user1@126.com,有一个组
    req.expect(200)
      .end(function (err, res) {
        var tasks = res.body.data;
        console.log(tasks);
        done(err);
      });
  });

  it('任务新增', function (done) {
    var req = request.post('/task-engine/runtime/tasks');
    agent.attachCookies(req);//user1@126.com,有一个组

    req.send({"assignee": "userId1",
      "description": "新任务",
      "dueDate": "2013-04-17T13:06:02.438+02:00",
      "name": "New task name",
      "owner": "userId1"});
    req.expect(200)
      .end(function (err, res) {
        var tasks = res.body.data;
        console.log(tasks);
        done(err);
      });
  });

});
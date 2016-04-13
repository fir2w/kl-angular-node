/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../../../index'),
  db = require('../../../lib/database'),
  kraken = require('kraken-js'),
  request = null,
  should = require('should');
var Team = require('../../../models/teamModel');
var TeamService = require('../../../services/teamService');
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

  it('team的提交', function (done) {
    //用户先登录
    var email = 'shan2@126.com';
    var name = '团队x';
    var req = request.post('/teams');
    agent.attachCookies(req);
    req.send({team: { name_: name}})
      .expect(200)
      .end(function (err, res) {
        var team = res.body.data;
        team.should.have.property('name_', name);
        done(err);
      });
  });

  it('用户管理下的team', function (done) {
    var req = request.get('/userId1/teams');
    agent.attachCookies(req);//user1@126.com,有一个组
    req.expect(200)
      .end(function (err, res) {
        var teams = res.body.data;
        teams.should.be.instanceof(Array).and.have.lengthOf(1);
        var ateam = teams[0];
        ateam.should.have.property('name_', 'team_name1');
        done(err);
      });
  });

  it('team下的成员', function (done) {
    var req = request.get('/teams/teamId3/members');
    req.expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        members.should.be.instanceof(Array).and.have.lengthOf(2);//2个成员
        done(err);
      });
  });

  it('teamId1下的成员', function (done) {
    var req = request.get('/teams/teamId1/members');
    req.expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        members.should.be.instanceof(Array).and.have.lengthOf(2);//2个成员
        done(err);
      });
  });

  it('新增teamId1下的成员', function (done) {
    var req = request.post('/teams/teamId1/members');
    req.send({members: ['userId4']})
      .expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        console.log('-----------' + JSON.stringify(res.body));
        members.should.be.instanceof(Array).and.have.lengthOf(1);//3个成员
        done(err);
      });
  });

  it('查询一个team下可供选择的所有成员', function (done) {
    var req = request.get('/teams/teamId5/optmembers');
    req.expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        members.should.be.instanceof(Array).and.have.lengthOf(3);//3个成员,可供选择
        done(err);
      });
  });

  it('查询一个用户相关的team', function (done) {
    var req = request.get('/userId1/relteams');
    req.expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        members.should.be.instanceof(Array).and.have.lengthOf(4);//3个成员,可供选择
        done(err);
      });
  });

  it('teams下的成员', function (done) {
    var req = request.post('/teams/all/members');
    req.send({teams: ['teamId4','teamId5']})
      .expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        console.log('-----------' + JSON.stringify(res.body));
        members.should.be.instanceof(Array).and.have.lengthOf(3);//3个成员
        done(err);
      });
  });

  it('teams下的memberships', function (done) {
    var req = request.post('/teams/all/memberships');
    req.send({teams: ['teamId3','teamId4','teamId5']})
      .expect(200)
      .end(function (err, res) {
        var members = res.body.data;
        console.log('-----------' + JSON.stringify(res.body));
        members.should.be.instanceof(Array).and.have.lengthOf(5);//3个成员
        done(err);
      });
  });
});
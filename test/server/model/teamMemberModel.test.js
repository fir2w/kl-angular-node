/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var request = require('supertest'),
  tools = require('../../../lib/util/tools.js'),
  should = require('should');
var Team = require('../../../models/teamModel');
var User = require('../../../models/userModel');
var TeamMember = require('../../../models/teamMemberModel');
var query = require('../../../lib/pg.js').query();
var cleanDB = require('../../lib/cleanDB.js')();
var db = require('../../../lib/database').sequelize();

describe('TeamMember', function () {

  //清理测试数据
  afterEach(function (done) {
    query('delete from team_membership', done);
  });

  it('创建和删除功能', function (done) {
    var teamMember = TeamMember.build({user_id_: 'userId1', team_id_: 'teamId1', id_: tools.getUUID()});
    teamMember.save().error(function (err) {
      done(err);
    }).success(function (teamObj) {//保存成功
        Team.find({where: {id_: teamObj.team_id_}, include: [
          {model: User, as: 'includeUsers'}
        ]}).success(function (teamM) {
            console.log("xxxxxxxxxxxxxxxxxxxxx:" + JSON.stringify(teamM));
            teamM.getIncludeUsers().success(function (associatedUsers) {
              console.log(JSON.stringify(associatedUsers));
            });
            //user.should.have.property('email_', 'user1@126.com');
            teamObj.destroy().success(function () {
              done();
            });
          }).error(function (err) {
            done(err);
          });
      });
  });

  /**
   * 1: {2,3}
   * 2: {1,2,3,4}
   * 3:{4,1}
   * 4: {1,2}
   */
  it('查询一个用户的拥有的team', function (done) {
    //userId2创建了2个组
    User.find({where: {id_: 'userId2'}, include: [
      {model: Team, as: 'myTeams'}
    ]}).success(function (user) {
        console.log('gggggggggggggg' + JSON.stringify(user));
        user.getMyTeams().success(function (teams) {
          teams.should.be.instanceof(Array).and.have.lengthOf(2);
          done();
        }).error(function (err) {
            done(err);
          });
      }).error(function (err) {
        done(err);
      });
    //userId2有2组
  });

  it('查询一个用户所在的team', function (done) {
    //userId2在三个组
    User.find({where: {id_: 'userId2'}, include: [
      {model: Team, as: 'myInTeams'}
    ]}).success(function (user) {
        user.getMyInTeams().success(function (teams) {
          teams.should.be.instanceof(Array).and.have.lengthOf(3);
          done();
        }).error(function (err) {
            done(err);
          });
      }).error(function (err) {
        done(err);
      });
    //userId2有2组


  });


  it('查询一个用户可以添加到团队的相关人员', function (done) {
    db
      .query(
      'select RES.*  from ACT_ID_USER RES inner join TEAM_MEMBERSHIP TM on RES.ID_ = TM.USER_ID_ WHERE TM.team_id_ = :team_id_', User,
      { raw: false }, { team_id_: 'teamId2' }
    )
      .success(function (users) {
        users.should.be.instanceof(Array).and.have.lengthOf(4);
        done();
      });
  });

});
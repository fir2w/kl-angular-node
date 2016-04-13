/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

//进行测试数据的初始化
var request = require('supertest'),
  tools = require('../../lib/util/tools.js');
var should = require('should');
var async = require('async');
var User = require('../../models/userModel');
var Team = require('../../models/teamModel');
var TeamMember = require('../../models/teamMemberModel');
var AssociatedUser = require('../../models/associatedUserModel');
var query = require('../../lib/pg.js').query();


/**
 *
 * userid1, 密码:123456    有一个组teamId1 team1:[user2,user3]
 * userid2, 有组teamId2，teamid3 team2:[user1,user2,user3,user4] team3:[user1,user4]
 * userid3, 有一个组teamId4 team4:[user1,user2]
 * userid4, 有一个组teamId5 team5:[user4]
 */

var forceValue = false;// true为强制创建表
var forceEnd = { force: forceValue };

exports.init = function (done) {
  var deleteFun = function (cb) {
    if (!forceValue) {
      async.series([
        function (cb) {//则更新sinaUser
          query('delete from team_membership', cb);
        }, function (cb) {//则更新sinaUser
          query('delete from associated_user', cb);
        }, function (cb) {//则更新sinaUser
          query('delete from team', cb);
        }, function (cb) {//则更新sinaUser
          query('delete from act_id_user where id_ like \'userId%\'', cb);
        }
      ],
        function (err, results) {
          cb(null, results);
        });
    } else {
      cb(null);
    }
  };
  async.series([
    deleteFun,
    function (cb) {//则更新sinaUser
      var userId1 = tools.getUUID();
      var userId2 = tools.getUUID();

      User.sync(forceEnd).success(function () {
        var userData = [
          {rev_:'0',email_: 'user1@126.com', first_: 'user1',last_:'user1', login_name_: 'user1', id_: 'userId1', screen_name_: 'user1', 'pwd_': '9AlRhjJu/UZV1cetxNSapgIKXq1ttQZtXNlc+4IHBA/5bd5/vs+MlgvdgmqamgHDP318IqtYT/IUGttAbV1L07Y0gBsZTrX5uWMOwoO0ZUeFzNzWO97s+Lua94sItdBbGSsUaI35KrumzSsYxSFUBqIUsG9iStHC3WQ7ykHlFvU=', 'hash_': 'isu9FqRrl6QmB29vMTR7ESLFmK/d0MwhuNBczwwiJBINMhoSep49HNDSZsE4/kQsg3R5JhelXK2E2dfTfpYGfkALAWZlpmOrn7quIx3TJoy5n0kPVi0TWCcHKP4Nt3XXUumist0ilD+D+Mnx787W6/vJtBpJPdFQFBHngwihc18='},
          {rev_:'0',email_: 'user2@126.com', first_: 'user2',last_:'user2',login_name_: 'user2', id_: 'userId2', screen_name_: 'user2', 'pwd_': '9AlRhjJu/UZV1cetxNSapgIKXq1ttQZtXNlc+4IHBA/5bd5/vs+MlgvdgmqamgHDP318IqtYT/IUGttAbV1L07Y0gBsZTrX5uWMOwoO0ZUeFzNzWO97s+Lua94sItdBbGSsUaI35KrumzSsYxSFUBqIUsG9iStHC3WQ7ykHlFvU=', 'hash_': 'isu9FqRrl6QmB29vMTR7ESLFmK/d0MwhuNBczwwiJBINMhoSep49HNDSZsE4/kQsg3R5JhelXK2E2dfTfpYGfkALAWZlpmOrn7quIx3TJoy5n0kPVi0TWCcHKP4Nt3XXUumist0ilD+D+Mnx787W6/vJtBpJPdFQFBHngwihc18='},
          {rev_:'0',email_: 'user3@126.com', first_: 'user3',last_:'user3',login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'},
          {rev_:'0',email_: 'user4@126.com', first_: 'user4',last_:'user4',login_name_: 'user4', id_: 'userId4', screen_name_: 'user4'}
        ];
        User.bulkCreate(userData).success(function (objects) {
          cb(null, objects);
        }).error(function (err) {
            cb(err);
          });
      });
    },
    function (cb) {
      Team.sync(forceEnd).success(function () {
        var userData = [
          {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},//成员2,3
          {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'},//3,4
          {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'},
          {name_: 'team_name4', id_: 'teamId4', own_user_: 'userId3', type_: '0'},//1,2,3,4
          {name_: 'team_name5', id_: 'teamId5', own_user_: 'userId4', type_: '0'}
        ];
        Team.bulkCreate(userData).success(function (objects) {
          cb(null, objects);
        }).error(function (err) {
            cb(err);
          });
      });
    },
    function (cb) {
      TeamMember.sync(forceEnd).success(function () {//team1:[user2,user3] team2:[user1,user2,user3,user4] team3:[user1,user4] team4:[user1,user2]
        var userData = [
          {user_id_: 'userId2', team_id_: 'teamId1', id_: tools.getUUID()},
          {user_id_: 'userId3', team_id_: 'teamId1', id_: tools.getUUID()},
          {user_id_: 'userId1', team_id_: 'teamId2', id_: tools.getUUID()},
          {user_id_: 'userId2', team_id_: 'teamId2', id_: tools.getUUID()},
          {user_id_: 'userId3', team_id_: 'teamId2', id_: tools.getUUID()},
          {user_id_: 'userId4', team_id_: 'teamId2', id_: tools.getUUID()},
          {user_id_: 'userId1', team_id_: 'teamId3', id_: tools.getUUID()},
          {user_id_: 'userId4', team_id_: 'teamId3', id_: tools.getUUID()},
          {user_id_: 'userId1', team_id_: 'teamId4', id_: tools.getUUID()},
          {user_id_: 'userId2', team_id_: 'teamId4', id_: tools.getUUID()},
          {user_id_: 'userId4', team_id_: 'teamId5', id_: tools.getUUID()}
        ];
        TeamMember.bulkCreate(userData).success(function (objects) {
          cb(null, objects);
        }).error(function (err) {
            cb(err);
          });
      });
    },
    function (cb) {
      AssociatedUser.sync(forceEnd).success(function () {//team1:[user2,user3] team2:[user1,user2,user3,user4] team3:[user1,user4] team4:[user1,user2]
        var userData = [
          {rel_user_: 'userId1', status_: '0', own_user_: 'userId4', id_: tools.getUUID()},
          {rel_user_: 'userId2', status_: '0', own_user_: 'userId4', id_: tools.getUUID()},
          {rel_user_: 'userId3', status_: '0', own_user_: 'userId4', id_: tools.getUUID()},
          {rel_user_: 'userId4', status_: '0', own_user_: 'userId4', id_: tools.getUUID()}
        ];
        AssociatedUser.bulkCreate(userData).success(function (objects) {
          cb(null, objects);
        }).error(function (err) {
            cb(err);
          });
      });
    }
  ],
    function (err, results) {
      done(null, results);
    });
};



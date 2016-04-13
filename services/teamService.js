'use strict';
var User = require('../models/userModel');
var Team = require('../models/teamModel');
var TeamMember = require('../models/teamMemberModel');
var tools = require('../lib/util/tools.js');
var db = require('../lib/database').sequelize();

var TeamServiceConstruct = (function () {
  var TeamService = function () {
  };
  TeamService.prototype.queryMyTeams = function (userId) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      User.find({where: {id_: userId}, include: [
        {model: Team, as: 'myTeams'}
      ]}).success(function (user) {
          user.getMyTeams().success(function (teams) {
            myCusemitter.emit('success', teams);
          }).error(function (err) {
              myCusemitter.emit('error', err);
            });
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });
    }).run();
  };


  /**
   * 查询属于我的相关的team
   * @param userId
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.queryMyRelTeam = function (userId) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sql = 'select distinct tm.* from team tm where tm.own_user_ =:pUserId or ' +
        'tm.id_ in ( select distinct team_id_ from team_membership tms where tms.user_id_ = :pUserId)';
      db.query(sql, Team,
        { raw: false }, { pUserId: userId }
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });

    }).run();
  };

  /**
   * 查询属于我的相关的team
   * @param userId
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.queryMyInTeams = function (userId) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sql = 'select distinct tm.* from team tm where ' +
        'tm.id_ in ( select distinct team_id_ from team_membership tms where tms.user_id_ = :pUserId)';
      db.query(sql, Team,
        { raw: false }, { pUserId: userId }
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });

    }).run();
  };


  /**
   * 查询teams下的成员
   * @param teamList
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.queryTeamsOfAllMembers = function (teamList) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sqlList = tools.arrayToSqlJoin(teamList);
      var sql = 'select distinct(u.*) from act_id_user u join team_membership tms  on tms.user_id_ = u.id_ where tms.team_id_ in(' + sqlList.join(',') + ')';
      db.query(sql, User,
        { raw: false }, {}
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });

    }).run();
  };

  TeamService.prototype.queryTeamsOfMemberShip = function (teamList) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sqlList = tools.arrayToSqlJoin(teamList);
      var sql = 'select distinct tms.* from team_membership tms where tms.team_id_ in(' + sqlList.join(',') + ')';
      db.query(sql, TeamMember,
        { raw: false }, {}
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });

    }).run();
  };

  /**
   * 查询指定下team成员
   * @param userId
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.queryTeamOfMember = function (teamId) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sql = 'select RES.*  from act_id_user RES where RES.id_ in ' +
        '( select tm.USER_ID_ from team_membership tm where tm.team_id_ =:team_id_ and tm.USER_ID_ = RES.id_)';
      db.query(sql, User,
        { raw: false }, { team_id_: teamId }
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });

    }).run();
  };

  /**
   * 查询teams成员
   * @param userId
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.createTeamMembers = function (teamId, userIds) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var userData = [];
      for (var index in userIds) {
        userData.push({user_id_: userIds[index], team_id_: teamId, id_: tools.getUUID()});
      }
      TeamMember.bulkCreate(userData).success(function (tms) {
        var strIds = [];
        tms.forEach(function(v){
          strIds.push('\'' + v.user_id_ + '\'');
        });
        var sql = 'select RES.*  from act_id_user RES where RES.id_ in (' + strIds.join(',') + ')';
        db.query(sql, User,
          { raw: false }, null
        )
          .success(function (users) {
            myCusemitter.emit('success', users);
          }).error(function (err) {
            myCusemitter.emit('error', err);
          });
      }).error(function (err) {
          myCusemitter.emit('error', err);
        });
    }).run();
  };

  /**
   * 查询一个team下可供选择的所有成员
   * @param teamId
   * @returns {*|Runner|boolean|COA.Cmd}
   */
  TeamService.prototype.querTeamOfOptMembers = function (teamId) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      var sql = 'select RES.*  from act_id_user RES where RES.id_ in (' +
        'select rel_user_ from associated_user au   where rel_user_ not in' +
        '( select tm.USER_ID_ from team_membership tm where tm.team_id_ =:team_id_ and tm.USER_ID_ = au.own_user_))';
      db.query(sql, User,
        { raw: false }, { team_id_: teamId }
      )
        .success(function (users) {
          myCusemitter.emit('success', users);
        }).error(function (err) {
          myCusemitter.emit('error', err);
        });
    }).run();
  };


  return TeamService;
})();


module.exports = new TeamServiceConstruct();
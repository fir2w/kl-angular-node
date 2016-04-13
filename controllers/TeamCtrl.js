'use strict';
var User = require('../models/userModel');
var Team = require('../models/teamModel');
var TeamMember = require('../models/teamMemberModel');
var TeamService = require('../services/teamService');
var tools = require('../lib/util/tools.js');


module.exports = function (server) {

  //查询一个账户所有的team
  server.get('/:userId/teams', function (req, res) {
    var userId = req.params.userId;
    TeamService.queryMyTeams(userId).on('success',function (teams) {
      tools.jsonData(res, teams);
    }).on('error', function (err) {
        tools.jsonErr(res, err);
      });
  });

  //查询一个账户所在的team
  server.get('/:userId/inteams', function (req, res) {
    var userId = req.params.userId;
    TeamService.queryMyInTeams(userId).on('success',function (teams) {
      tools.jsonData(res, teams);
    }).on('error', function (err) {
        tools.jsonErr(res, err);
      });
  });

  //查询一个账户相关team
  server.get('/:userId/relteams', function (req, res) {
    var userId = req.params.userId;
    TeamService.queryMyRelTeam(userId).on('success',function (teams) {
      tools.jsonData(res, teams);
    }).on('error', function (err) {
        tools.jsonErr(res, err);
      });
  });

  //查询一个team下的所有成员
  server.get('/teams/:teamId/members', function (req, res) {
    var teamId = req.params.teamId;
    TeamService.queryTeamOfMember(teamId).on('success',function (users) {
      tools.jsonData(res, users);
    }).on('error', function (err) {
        tools.jsonErr(res, err);
      });
  });

  //查询team集合下都有成员
  server.post('/teams/all/members', function (req, res) {
    var teamList = req.body.teams;
    if (teamList != null && teamList.length > 0) {
      TeamService.queryTeamsOfAllMembers(teamList).on('success',function (users) {
        tools.jsonData(res, users);
      }).on('error', function (err) {
          tools.jsonErr(res, err);
        });
    }else {
      tools.jsonErr(res, '参数错误');
    }
  });

  //查询team集合下都有成员
  server.post('/teams/all/memberships', function (req, res) {
    var teamList = req.body.teams;
    if (teamList != null && teamList.length > 0) {
      TeamService.queryTeamsOfMemberShip(teamList).on('success',function (ships) {
        tools.jsonData(res, ships);
      }).on('error', function (err) {
          tools.jsonErr(res, err);
        });
    }else {
      tools.jsonErr(res, '参数错误');
    }
  });


  //一个team下增加成员
  server.post('/teams/:teamId/members', function (req, res) {
    var teamId = req.params.teamId;
    var ids = req.body.members;
    if (ids != null && ids.length > 0) {
      TeamService.createTeamMembers(teamId, ids).on('success',function (users) {
        tools.jsonData(res, users);
      }).on('error', function (err) {
          tools.jsonErr(res, err);
        });
    }else {
      tools.jsonErr(res, '参数错误');
    }
  });


  //查询一个team下可供选择的所有成员
  server.get('/teams/:teamId/optmembers', function (req, res) {
    var teamId = req.params.teamId;
    TeamService.querTeamOfOptMembers(teamId).on('success',function (users) {
      tools.jsonData(res, users);
    }).on('error', function (err) {
        tools.jsonErr(res, err);
      });
  });


  //新增team
  server.post('/teams', function (req, res) {
    var teamData = req.body.team;
    teamData.id_ = tools.getUUID();
    teamData.own_user_ = req.user.id_;

    var team = Team.build(teamData);
    team.save().error(function (err) {
      tools.jsonErr(res, err);
    }).success(function (teamObj) {
        tools.jsonData(res, teamObj);
      });
  });
};

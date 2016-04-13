ngDefine('klwork.services.userManager',['async'], function (md,async) {
  'use strict';

  md.factory('userManager', function ($http, $rootScope, socketio) {
    var dbTeams = TAFFY();//所有的组（包含在其中的组和用户拥有的组)
    var dbTeamMemberShips = TAFFY();//team的成员

    var dbMyRelUsers = TAFFY();//所有相关用户缓存
    var dbMyInTeams = TAFFY();//用户在其中的组id

    var dbMessages = TAFFY();//用户消息

    var loginUser = null;

    return {
      getLoginUserId: function () {
        if (loginUser) {
          return loginUser.id_;
        }
        return '-1';
      },
      getLoginUser: function () {
        return loginUser;
      },
      setLoginUser: function (user) {
        loginUser = user;
        $rootScope.$broadcast('UserChanged', user);//向下广播
        socketio.emit('join', user.id_);
      },

      initFakeData: function () {
        //用户相关的组
        var teamData = [
          {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},
          {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'},
          {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'},
          {name_: 'team_name4', id_: 'teamId4', own_user_: 'userId3', type_: '0'},
          {name_: 'team_name5', id_: 'teamId5', own_user_: 'userId4', type_: '0'}
        ];

        dbTeams.insert(teamData);

        //用户加入的组
        var userInTeamsData = [
          {id_: 'teamId1'},
          {id_: 'teamId2'},
          {id_: 'teamId4'}
        ];

        dbMyInTeams.insert(userInTeamsData);

        //用户缓存信息
        var userData = [
          {email_: 'user1@126.com', login_name_: 'user1', id_: 'userId1', screen_name_: 'user1'},
          {email_: 'user2@126.com', login_name_: 'user2', id_: 'userId2', screen_name_: 'user2'},
          {email_: 'user3@126.com', login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'},
          {email_: 'user4@126.com', login_name_: 'user4', id_: 'userId4', screen_name_: 'user4'}
        ];
        dbMyRelUsers.insert(userData);

        /* //用户相关的用户
         var userMyRel = [
         {id_: 'userId1'},
         {id_: 'userId2'},
         {id_: 'userId3'},
         {id_: 'userId4'}
         ];
         dbMyRelUsers.insert(userMyRel);*/


        var members = [
          {user_id_: 'userId2', team_id_: 'teamId1' },
          {user_id_: 'userId3', team_id_: 'teamId1' },
          {user_id_: 'userId1', team_id_: 'teamId2' },
          {user_id_: 'userId2', team_id_: 'teamId2' },
          {user_id_: 'userId3', team_id_: 'teamId2' },
          {user_id_: 'userId4', team_id_: 'teamId2' },
          {user_id_: 'userId1', team_id_: 'teamId3' },
          {user_id_: 'userId4', team_id_: 'teamId3' },
          {user_id_: 'userId1', team_id_: 'teamId4' },
          {user_id_: 'userId2', team_id_: 'teamId4' },
          {user_id_: 'userId4', team_id_: 'teamId5' }
        ];

        dbTeamMemberShips.insert(members);
        this.noticeUserDataReaded();
      },
      noticeUserDataReaded: function () {
        $rootScope.$broadcast('UserInitDataReaded', '');//向下广播
      },
      //初始化登录用户数据
      initLoginUserData: function (user) {
        dbTeams().remove();
        dbMyRelUsers().remove();
        dbTeamMemberShips().remove();

        var deps = {
          queryRelteams: function (cb) {
            $http.get('/' + user.id_ + '/relteams').success(function (result) {
              if (tools_.resDataValid(result)) {
                var teams = result.data;
                if (teams.length > 0) {
                  console.log('queryRelteams:' + JSON.stringify(teams));
                  dbTeams.insert(teams);
                  var postIds = teams.map(function (team) {
                    return team.id_;
                  });

                  cb(null, postIds);
                }
              }
              //cb(null, []);
            });
          },
          queryAllMembers: ['queryRelteams', function (cb, results) {
            //console.log('queryAllMembers:' + JSON.stringify(results));
            //查询teams
            $http.post('/teams/all/members', {'teams': results['queryRelteams']}).success(function (result) {
              if (tools_.resDataValid(result)) {
                var members = result.data;
                if (members.length > 0) {
                  console.log('queryAllMembers:' + JSON.stringify(members));
                  dbMyRelUsers.insert(members);
                  cb(null, members);
                }
              }
              // cb(null, []);
            });
          }],
          queryMemberships: ['queryRelteams', function (cb, results) {
            //查询teams
            $http.post('/teams/all/memberships', {'teams': results['queryRelteams']}).success(function (result) {
              if (tools_.resDataValid(result)) {
                var ships = result.data;
                if (ships.length > 0) {
                  console.log('queryMemberships:' + JSON.stringify(ships));
                  dbTeamMemberShips.insert(ships);
                  cb(null, ships);
                }
              }
              //cb(null, []);
            });
          }],
          queryInteams: function (cb) {
            $http.get('/' + user.id_ + '/inteams').success(function (result) {
              if (tools_.resDataValid(result)) {
                var inTeams = result.data;
                if (inTeams.length > 0) {
                  var ids = inTeams.map(function (team) {
                    return {id_: team.id_};
                  });
                  console.log('queryInteams:' + JSON.stringify(ids));
                  dbMyInTeams.insert(ids);
                  cb(null, ids);
                }
              }
              //cb(null, []);
            });
          }

        };

        async.auto(deps,
          function (err, results) {
            console.log('err = ', err);
            $rootScope.$broadcast('UserInitDataReaded', '');//向下广播
          });
      },
      queryUserById: function (pUserId) {
        var userId = pUserId || this.getLoginUserId();
        var user = dbMyRelUsers({id_: userId}).first();
        return user;
      },
      //查询用户下的teams
      queryUserTeams: function (pUserId) {
        var userId = pUserId || this.getLoginUserId();
        var teams = dbTeams({own_user_: userId}).get();
        return teams;
      },

      //查询用户所在的teams
      queryUserInTeams: function (pUserId) {
        var userId = pUserId || this.getLoginUserId();
        var teams = dbTeams()
          .join(dbMyInTeams,function (l, r) {
            return (l.id_ === r.id_);
          }).get();
        return teams;
      },

      //team下的成员
      queryTeamOfMembers: function (teamId) {
        var members = dbMyRelUsers()
          .join(dbTeamMemberShips,function (l, r) {
            return (l.id_ === r.user_id_ && r.team_id_ === teamId);
          }).get();
        return members;
      },
      //team下的还没有加入到此team用户
      queryTeamOfOptMembers: function (teamId) {
        //查询出关联的user，查出team下的用户， 进行交集
        var teamUser = this.queryTeamOfMembers(teamId);
        var allUser = dbMyRelUsers().get();
        var companFun = function (value, target) {
          return value.id_ === target.id_;
        };

        var retUser = tools_.difference(allUser, teamUser, companFun);
        /*var retUser = tools_.ud.chain(allUser)
         .difference(teamUser).value();*/
        return retUser;
      },
      //查询用户相关的消息
      queryUserMessages: function (pUserId) {
        var userId = pUserId || this.getLoginUserId();
        var messages = dbMessages({ from_user_: userId}, { to_user_: userId}).get();//或者来源为userid,或者发给userId的消息
        return messages;
      },

      insertMessage: function (message) {
        dbMessages.insert(message);
      }

    };
  });
});

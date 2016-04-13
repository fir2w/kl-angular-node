'use strict';

describe('userManager service测试', function () {

  // load the controller's module
  beforeEach(module('klwork'));

  var service = null,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, userManager, $rootScope) {
    scope = $rootScope.$new();
    service = userManager;
  }));

  function containObj(teams, incData) {
    var companFun = function (value, target) {
      return value.id_ === target.id_;
    };
    var ret = tools_.contains(teams, incData, companFun);
    return ret;
  }

  function containCollection(teams, arrays) {
    arrays.forEach(function (item) {
      if (!containObj(teams, item)) {
        return false;
      }
    });
    return true;
  }

  it('queryUserTeams', function () {
    var teams = service.queryUserTeams('userId2');
    expect(teams.length).toBe(2);//2,3
    var incData = {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'};

    expect(containObj(teams, incData)).toBe(true);//

    incData = {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'};
    expect(containObj(teams, incData)).toBe(true);//

    incData = {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'};
    expect(containObj(teams, incData)).toBe(false);//

  });

  it('queryTeamOfOptMembers', function () {
    var members = service.queryTeamOfOptMembers('teamId3');

    expect(members.length).toBe(2);//2,3
    var userData = [
      {email_: 'user1@126.com', login_name_: 'user1', id_: 'userId1', screen_name_: 'user1'},
      {email_: 'user4@126.com', login_name_: 'user4', id_: 'userId4', screen_name_: 'user4'}
    ];
    expect(containCollection(members, userData)).toBe(true);//

    //可供选择的用户
    var optMembers = service.queryTeamOfOptMembers('teamId3');
    expect(optMembers.length).toBe(2);//2,3
    var optData = [
      {email_: 'user2@126.com', login_name_: 'user2', id_: 'userId2', screen_name_: 'user2'},
      {email_: 'user3@126.com', login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'}
    ];

    expect(containCollection(optMembers, optData)).toBe(true);//

  });

  it('查询用户所在的team', function () {
    var teams = service.queryUserInTeams('userId2');

    expect(teams.length).toBe(3);//1,2,4
    var teamData = [
      {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},
      {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'},
      {name_: 'team_name4', id_: 'teamId4', own_user_: 'userId3', type_: '0'}
    ];
    expect(containCollection(teams, teamData)).toBe(true);//

  });


});

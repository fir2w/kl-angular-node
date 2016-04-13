'use strict';

describe('tools test', function () {
  describe('contains测试', function () {

    it('普通测试', function () {
      var test = [123, 456, 78];
      var ret = tools_.contains(test, 123);
      expect(ret).toBe(true);
      ret = tools_.contains(test, 23);
      expect(ret).toBe(false);
    });

    it('自定义回掉', function () {
      var datas = [
        {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},
        {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'},
        {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'},
        {name_: 'team_name4', id_: 'teamId4', own_user_: 'userId3', type_: '0'},
        {name_: 'team_name5', id_: 'teamId5', own_user_: 'userId4', type_: '0'}
      ];
      var incData = {name_: 'team_namexx1', id_: 'teamId1', own_user_: 'userId1', type_: '0'};
      var companFun  = function (value,target) {
        return value.id_ === target.id_;
      };
      var ret = tools_.contains(datas, incData,companFun);
      expect(ret).toBe(true);

      incData = {name_: 'team_name1', id_: 'teamId9', own_user_: 'userId1', type_: '0'};
      ret = tools_.contains(datas, incData,companFun);
      expect(ret).toBe(false);
    });

  });

  it('difference测试', function () {
    var datas = [
      {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},
      {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'},
      {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'},
      {name_: 'team_name4', id_: 'teamId4', own_user_: 'userId3', type_: '0'},
    ];

    var datas2 = [
      {name_: 'team_name1', id_: 'teamId1', own_user_: 'userId1', type_: '0'},
      {name_: 'team_name3', id_: 'teamId3', own_user_: 'userId2', type_: '0'},
      {name_: 'team_name2', id_: 'teamId2', own_user_: 'userId2', type_: '0'}
    ];

    var companFun  = function (value,target) {
      return value.id_ === target.id_;
    };
    var ret = tools_.difference(datas, datas2,companFun);
    expect(ret.length).toBe(1);

  });
});

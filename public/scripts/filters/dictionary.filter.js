ngDefine('klwork.filters', function (module) {
  'use strict';
  module.filter('dict', function () {
    var dbDict = TAFFY();//数据字典
    //用户相关的组
    var teamData = [
      {code_: 'owner', type_: '50', value_: 'owner', name_: '所属人'},
      {code_: 'assignee', type_: '50', value_: 'assignee', name_: '办理人'},
      {code_: 'contributor', type_: '50', value_: 'contributor', name_: '贡献者'},
      {code_: 'patron', type_: '50', value_: 'patron', name_: '赞助人'}
    ];

    dbDict.insert(teamData);

    return function (value,type) {
      if (!value) {//null
        return '';
      }
      var dict = dbDict({type_: type, value_: value}).first();
      if (dict) {
        return dict.name_;
      } else {
        return value;
      }
    };
  });
});

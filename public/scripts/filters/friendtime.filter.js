ngDefine('klwork.filters', function (module) {
  'use strict';
  module.filter('friendtime', function () {
    return function (value,nullDisTitle) {
      if (!value) {//null
        return nullDisTitle || value;
      }
      //2008-01-26T08:00:00Z
      //2014-04-17T03:03:48.516+0000
      //2012-01-07T23:30:59.001+01:00
      if(value.length > 19){
        value = value.substring(0,19);
      }
      //var ret = $.prettyDate.format(value);
      moment.lang('zh-cn');
      var ret = moment(value).fromNow();
      if (ret) {
        return ret;
      } else {
        return value;
      }
    };
  });
});

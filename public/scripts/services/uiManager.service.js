ngDefine('klwork.services', function (module) {
  'use strict';
  module.factory('uiManager', function ($http, $rootScope, socketio) {

    return {
      showSiderBar: function (sign) {
        $rootScope.$broadcast('ShowSiderBar', sign);//向下广播
      }
    };
  });

});

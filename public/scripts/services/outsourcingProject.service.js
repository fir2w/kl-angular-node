ngDefine('klwork.services', [
  'angular'
], function (module, angular) {

  module.factory('outsourcingProjectManager', function ($http, $rootScope, socketio) {
    return {
      //提交需求任务
      submitPublishNeed: function (outsourcingProject, cb) {
        $http.post('/tasks/publishNeed',outsourcingProject).success(function (result) {
          cb(result);
        });
      }
    };
  });
});

ngDefine('klwork.services', function (md) {
  'use strict';

  md.factory('taskManager', function ($http, $rootScope, socketio,userManager) {


    var loginUser = null;
    var taskList = $resource(Uri.appUri("engine://engine/:engine/task/:id/:operation"), { id: "@id" } , {
      claim : { method: 'POST', params : { operation: "claim" }},
      unclaim : { method: 'POST', params : { operation: "unclaim" }},
      delegate : { method: 'POST', params : { operation: "delegate" }},
      resolve : { method: 'POST', params : { operation: "resolve" }},
      complete : { method: 'POST', params : { operation: "complete" }},
      submitTaskForm : { method: 'POST', params : { operation: "submit-form" }}
    });

    return {
      //查询用户当前的任务
      queryUserInbox: function (cb) {
        var firstResponse = $http.get('/' + userManager.getLoginUserId() + '/tasks/inbox');
        firstResponse.success(function (result, status, headers, config) {
          cb(result);
        });
      },

      //查询用户关联的用户
      queryTaskIdentitys: function (taskId,cb) {
       $http.get('/tasks/' + taskId + '/identitylinks').success(function (result, status, headers, config) {
          cb(result);
        });
      }

    };
  });
});

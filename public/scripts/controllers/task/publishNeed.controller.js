define(['angular'], function (angular) {
  'use strict';
  var module = angular.module('klwork.controllers');

  module.controller('publishNeedController', function ($scope, $rootScope,$http, userManager, outsourcingProjectManager) {
    //项目需求
    $scope.outsourcingProject = {};

    //完成任务
    $scope.completeTask = function () {
      outsourcingProjectManager.submitPublishNeed($scope.outsourcingProject, function (task) {
      //保存任务成功
        $rootScope.$broadcast('CompleteTaskSuccess', task);//向下广播
      });
    };

  });
});

define(['angular'], function (angular) {
  'use strict';
  var module = angular.module('klwork.controllers');

  module.controller('inboxTaskController', function ($scope, $http, userManager, taskManager, notificationManager,imManager) {

    //
    $scope.tasks = [
      {name_: 'hello'}
    ];
    $scope.selectedRowIndex = '';

    //当前操作的team
    $scope.selectedTask = {};


    //改变team的数据
    $scope.changeCurrentSelected = function (task, index) {
      //记录选择序号
      $scope.selectedRowIndex = index;
      $scope.selectedTask = task;
      //console.log(());

    };

    $scope.talkTo = function(toUserId) {
      imManager.requestTalk(userManager.getLoginUserId(),toUserId);
    };

    $scope.init = function () {

      var queryObject = {};
      //任务的指定人
      queryObject.assignee = userManager.getLoginUserId();

      taskManager.getTaskList().query(queryObject, function (result) {//一个对象
        if (taskManager.resDataValid(result)) {
          var tasks = result.data;
          if (tasks.length > 0) {
            $scope.tasks = tasks;
            //默认选择第一个
            $scope.selectedRowIndex = '0';//默认选中第一个
            $scope.selectedTask = tasks[0];
            $scope.changeCurrentSelected($scope.selectedTask, 0);

            //每个对象的identitys
            angular.forEach($scope.tasks, function (task) {
              /* taskManager.queryTaskIdentitys(task.id, function (taskResut) {
               task.identitys = taskResut.data;
               });*/
              //任务的关联人
              taskManager.getIdentitylinks().query({'taskId': task.id}, function (result) {
                  task.identitys = result;
              });

              //任务的相关附件
              taskManager.getAttachments().query({'taskId': task.id}, function (result) {
                task.attachments = result;
              });

              task.form = {view: 'views/task/publishNeedForm.view.html'};
              if (task.id == 'e5812640-c5dc-11e3-bea8-00155d006401') {
                task.form = {view: 'views/task/crowForm2.view.html'};
              }
            });
          }
        }
      });

      /* var firstResponse = $http.get('/' + userManager.getLoginUserId() + '/tasks/inbox');
       firstResponse.success(function (result, status, headers, config) {

       });*/

    };

    $scope.init();

    $scope.toggled = function(open) {
      console.log('Dropdown is now: ', open);
    };

    $scope.$on('CompleteTaskSuccess',
      function (event, task) {
        console.log('任务完成成功');
        notificationManager.addMessage({type: 'success', text: '任务完成成功'});
        //刷新下一个任务
      });
  });
});

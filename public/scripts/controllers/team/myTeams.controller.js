define(['angular'], function (angular) {
  'use strict';

  angular.module('klwork.controllers')
    .controller('myteamsController', function ($scope, $http, $modal, $log, $rootScope, userManager,$dialog) {

      //我的所有team
      $scope.myteams = {};

      //页面新增保存的team
      $scope.submitTeam = {};

      //当前选择的table中团队实体序号
      $scope.selectedRowIndex = '';


      //当前操作的team
      $scope.selectedTask = null;

      $scope.opers = {};

      //当前选择的团队下的成员
      $scope.opers.currentTeamMembers = {};
      //原有的数据
      $scope.opers.optMembers = [];
      $scope.opers.optSelectedMembers = [];

      //新增的数据
      $scope.opers.addMembers = [];
      $scope.opers.addSelectedMembers = [];

      //用户排序函数
      var sortUser = function (user) {
        return user.screen_name_;
      };

      $scope.opers.toRight = function () {
        $scope.opers.addMembers = tools_.ud.chain($scope.opers.addMembers)
          .union($scope.opers.optSelectedMembers).sortBy(sortUser).value();

        //删除原来的东西
        $scope.opers.optMembers = tools_.ud.chain($scope.opers.optMembers)
          .difference($scope.opers.optSelectedMembers).sortBy(sortUser).value();
        // $scope.opers.optMembers = tools_.ud.difference($scope.opers.optMembers,$scope.opers.optSelectedMembers);//
      };

      //
      $scope.opers.clearSelectedData = function () {
        $scope.opers.addSelectedMembers = [];//清空
        $scope.opers.addMembers = [];
      };

      //保存添加的成员
      $scope.opers.saveSelectedMembers = function () {
        var teamId = $scope.selectedTask.id_;
        var postIds = tools_.ud.map($scope.opers.addMembers, function (user) {
            return user.id_;
          }
        );
        if (postIds == null || postIds.length == 0) {
          return;
        }
        $http.post('/teams/' + teamId + '/members', {'members': postIds}).success(function (result) {
          if (tools_.resDataValid(result)) {
            $scope.opers.clearSelectedData();
            //把新加入的数据放到当前页面中
            $scope.opers.currentTeamMembers = tools_.ud.chain($scope.opers.currentTeamMembers)
              .union(result.data).sortBy(sortUser).value();
            $scope.selectMemberShow = false;
          }
        });
      };


      $scope.opers.toLeft = function () {
        $scope.opers.optMembers = tools_.ud.chain($scope.opers.optMembers)
          .union($scope.opers.addSelectedMembers).sortBy(function (user) {
            return user.screen_name_;
          }).value();

        //删除原来的东西
        $scope.opers.addMembers = tools_.ud.chain($scope.opers.addMembers)
          .difference($scope.opers.addSelectedMembers).sortBy(function (user) {
            return user.screen_name_;
          }).value();
      };

//登陆用户
      // var currentUser = $rootScope.loginUser;
//初始化
      /* var firstResponse = $http.get('/' + currentUser.id_ + '/teams');
       firstResponse.success(function (result, status, headers, config) {
       console.log(result);
       if (tools_.resDataValid(result)) {
       var teams = $scope.myteams = result.data;
       if (teams.length > 0) {
       //默认选择第一个
       $scope.selectedRowIndex = '0';//默认选中第一个
       $scope.currentTeam = teams[0];
       $scope.changeCurrentTeam($scope.currentTeam, 0);
       }
       }
       });*/
      $scope.init = function () {
        //查询用户的所有的team
        var teams = $scope.myteams = userManager.queryUserTeams();
        if (teams.length > 0) {
          //默认选择第一个
          $scope.selectedRowIndex = '0';//默认选中第一个
          $scope.selectedTask = teams[0];
          $scope.changeCurrentSelected($scope.selectedTask, 0);
        }
      };


      /**
       * 保存team到数据库
       */
      $scope.saveTeam = function () {
        $http.post('/teams', {'team': $scope.submitTeam}).success(function (result, status, headers, config) {
          if (tools_.resDataValid(result)) {
            $scope.myteams.push(result.data);
          }
        });
      };

//改变team的数据
      $scope.changeCurrentSelected = function (team, index) {

        var teamId = team.id_;
        //记录选择序号
        $scope.selectedRowIndex = index;
        $scope.selectedTask = team;

        var members = userManager.queryTeamOfMembers(teamId);
        $scope.opers.currentTeamMembers = members;
        /*$http.get('/teams/' + teamId + '/members')
         .success(function (result, status, headers, config) {
         if (tools_.resDataValid(result)) {
         $scope.opers.currentTeamMembers = result.data;
         }
         });*/
      };

      $scope.detail = {name: 'kerry'};

//显示窗口控制变量
      $scope.selectMemberShow = false;

      $scope.addMember = function(){

        var dialog = $dialog.dialog({
          resolve: {//传值
            processData: function() { return $scope.processData; },
            processInstance: function() { return $scope.processInstance; }
          },
          controller: 'selectPeopleController',
          templateUrl: 'views/team/dialog/selectPeople.view.html'
        });

        dialog.open().then(function(result) {
          // dialog closed. YEA!
          if (result === "SUCCESS") {

          }
        });
      };

//打开新增成员窗口
      $scope.addMember2 = function () {
        $scope.opers.clearSelectedData();
        //查询可供选择的成员/teams/:teamId/optmembers
        var teamId = $scope.selectedTask.id_;
        // $http.get('/teams/' + teamId + '/optmembers').success(function (result) {
        var members = userManager.queryTeamOfOptMembers(teamId);
        $scope.opers.optMembers = members;
        /* if (tools_.resDataValid(result)) {
         $scope.opers.optMembers = result.data;
         }*/
        $scope.detail = {name: ''};
        $scope.selectMemberShow = true;
        // });
      };

      $scope.close = function () {
        $scope.selectMemberShow = false;
      };

      $scope.$on('UserInitDataReaded',
        function (event, teams) {
          $scope.init();
        });
      $http.init();
    });

});
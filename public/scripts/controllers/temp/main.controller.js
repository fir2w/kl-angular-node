'use strict';

angular.module('klwork')
  .controller('MainCtrl', function ($scope, $rootScope, $location, socketio) {
    $scope.menus = [
      {menuName: '我的工作台', sign: 'dashboard', speicalStyle: 'fa-dashboard', isActive: true},
      {menuName: '项目管理', sign: 'project', speicalStyle: 'fa-desktop', isActive: false},
      {menuName: '任务管理', sign: 'taskMain', speicalStyle: 'fa-edit', isActive: false},
      {menuName: '团队管理', sign: 'team', speicalStyle: 'fa-list', isActive: false},
      {menuName: '看板', sign: 'kanban', speicalStyle: 'fa-list', isActive: false},
      {menuName: '外包管理', sign: 'crowdsourcing', speicalStyle: 'fa-list', isActive: false},
      {menuName: '社交管理', sign: 'social', speicalStyle: 'fa-desktop', isActive: false},
      {menuName: '日程管理', sign: 'calendar', speicalStyle: 'fa-calendar', isActive: false}
    ];

    //显示侧边拦
    $scope.sidebarShow = false;
    $scope.$on('ShowSiderBar',
      function (event, sign) {
        $scope.sidebarShow = sign;
      });

  });

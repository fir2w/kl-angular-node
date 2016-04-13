define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('klwork.controllers');

  module.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', 'userManager', function ($scope, $rootScope, $http, $location, userManager) {
    //错误消息
    $scope.alertMessage = '';
    $scope.user = {email: 'user1@126.com', password: '123456'};
    //提交注册
    $scope.submitRegister = function (user) {
      $http.post('/register', user)
        .success(function (data) {
          console.log('register  success' + data);
          if (data == '0') {//
            $scope.alertMessage = '此用户已经存在';
          } else {//注册成功
            $location.url('/');
          }
        })
        .error(function () {
          console.log('err');
        });
    };

    //提交登录
    $scope.submitLogin = function (user) {
      $http.post('/login', user)
        .success(function (uData) {
          console.log('login  success' + uData);
          //初始化登录用户的处理
          userManager.setLoginUser(uData);
          userManager.initLoginUserData(uData);

          $location.url('/');
        })
        .error(function () {
          $rootScope.message = 'Authentication failed.';
          $location.url('/login');
        });
    };
  }]);
});
define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('klwork.controllers');

  module
    .controller('DashboardCtrl', function ($scope, $rootScope, $location, uiManager) {
      uiManager.showSiderBar(true);
    });
});
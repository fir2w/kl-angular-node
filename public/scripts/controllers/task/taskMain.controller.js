define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('klwork.controllers');
  var ctrl = [
    '$scope','uiManager',
    function ($scope,uiManager) {
      uiManager.showSiderBar(true);
    }];

  var app = angular.module('klwork');
  app.register.controller('taskMainController', ctrl);
});
/* global define: false */
define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('klwork.controllers');

  module
    .controller('HallMainCtrl', function ($scope, $rootScope, $location, uiManager) {
      uiManager.showSiderBar(false);
    });
});

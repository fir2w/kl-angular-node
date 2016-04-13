'use strict';

angular.module('klwork')
  .controller('HallMainCtrl', function ($scope, $rootScope, $location, uiManager) {
    uiManager.showSiderBar(false);
  });

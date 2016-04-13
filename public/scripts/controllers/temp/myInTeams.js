'use strict';

angular.module('klwork')
  .controller('MyinteamsCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });

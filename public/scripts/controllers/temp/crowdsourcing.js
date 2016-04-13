'use strict';

angular.module('klwork')
  .controller('CrowdsourcingCtrl', function ($scope, $http) {
    $scope.treeConfig = {initialState:'expanded'};
    $scope.todolist = [
      {id_: '1', pid_: '', name_: 'test1',is_container_:'0'},
      {id_: '2', pid_: '', name_: 'test2',is_container_:'1'},
      {id_: '3', pid_: '2', name_: 'test3',is_container_:'0'},
      {id_: '4', pid_: '2', name_: 'test4',is_container_:'0'},
      {id_: '5', pid_: '', name_: 'test5',is_container_:'1'},
      {id_: '6', pid_: '5', name_: 'test56',is_container_:'0'},
      {id_: '7', pid_: '', name_: 'test7',is_container_:'0'}
    ];

  });

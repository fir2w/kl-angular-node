'use strict';

angular.module('klwork')
  .controller('SocialCtrl', function ($scope, $http, safeApply,$dialog) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.pickerConfig = {startDate: '%y-%M-01 00:00:00', dateFmt: 'yyyy-MM-dd HH:mm:ss'};
    $scope.pickerConfig2 = {startDate: '%y-%M-01 00:00:00', dateFmt: 'yyyy-MM-dd HH:mm:ss'};
    $scope.des = '';
    $scope.currentEvent = {
      title: '',
      start: new Date(),
      allDay: true,
      end: new Date(),
      className: ['openSesame'],
      des: ''
    };

    console.log('CalendarCtrl:' + $scope.$id);




    $scope.allDayHandler = function (newValue, oldValue) {
      console.log('allDayHandler:' + newValue);
      if (newValue && newValue.allDay) {//一整天
        $scope.pickerConfig.dateFmt = 'yyyy-MM-dd';
        console.log('allDay execute:' + $scope.$id + $scope.pickerConfig.dateFmt);
      } else {
        $scope.pickerConfig.dateFmt = 'yyyy-MM-dd HH:mm:ss';
        console.log('allDay false' + $scope.$id);
      }
    };




    //监听allDay是否进行了变化
    $scope.$watch('currentEvent', $scope.allDayHandler, true);

    //
    $scope.openTest = function(){

      var dialog = $dialog.dialog({
        resolve: {
          processData: function() { return $scope.processData; },
          processInstance: function() { return $scope.processInstance; }
        },
        controller: 'ProjectCtrl',
        templateUrl: 'views/openTest.html'
      });

      dialog.open().then(function(result) {

        // dialog closed. YEA!
        if (result === "SUCCESS") {
          // refresh filter and all views
          $scope.processData.set('filter', angular.extend({}, $scope.filter));
        }
      });
    };

  });

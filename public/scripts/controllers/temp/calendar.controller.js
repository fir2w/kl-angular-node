'use strict';

angular.module('klwork')
  .controller('CalendarCtrl', function ($scope, $http, safeApply) {
    var date = new Date();
    var dateYMD = date.toString('yyyy-MM-dd');
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.pickerConfig = {startDate: dateYMD, dateFmt: 'yyyy-MM-dd'};
    $scope.pickerConfig2 = {startDate: dateYMD, dateFmt: 'yyyy-MM-dd'};

    $scope.myTest = false;
    $scope.currentEvent = {
      title: '',
      start: new Date(),
      allDay: true,
      end: new Date(),
      className: ['openSesame']
    };

    console.log('CalendarCtrl:' + $scope.$id);


    //初始化当前的事件
    $scope.initEvent = function () {
      $scope.currentEvent = {
        title: '',
        start: new Date(),
        allDay: true,
        end: new Date(),
        className: ['openSesame']
      };
    };

    $scope.allDayHandler = function (newValue, oldValue) {
      console.log('+++++++++++++currentEvent监听执行:' + angular.toJson(newValue) + '----------' + angular.toJson(oldValue));
      if (newValue && newValue.allDay) {//一整天
        $scope.pickerConfigReset($scope.pickerConfig, 0);
        $scope.pickerConfigReset($scope.pickerConfig2, 0);
        //console.log('allDay execute:' + $scope.$id + $scope.pickerConfig.dateFmt);
      } else {
        $scope.pickerConfigReset($scope.pickerConfig, 1);
        $scope.pickerConfigReset($scope.pickerConfig2, 1);
      }
    };


    $scope.pickerConfigReset = function (pickerConfig, formatType) {
      if (formatType === 0) {
        pickerConfig.dateFmt = 'yyyy-MM-dd';
        if (pickerConfig.startDate) {
          var sDate = Date.parse(pickerConfig.startDate);
          if (sDate !== null) {
            pickerConfig.startDate = sDate.toString('yyyy-MM-dd');
          }
        }
      } else {
        pickerConfig.dateFmt = 'yyyy-MM-dd HH:mm';
        if (pickerConfig.startDate) {
          var sDate2 = Date.parse(pickerConfig.startDate);
          if (sDate2 !== null) {
            pickerConfig.startDate = sDate2.toString('yyyy-MM-dd HH:mm');
          }
        }
      }
      console.log('startDate:' + pickerConfig.startDate);
    };


    //显示日期
    $scope.showWdatePicker = function () {
      console.log('showWdatePicker');
      $dp.show();
    };

    //控制显示增加事件的
    $scope.isDialogShow = false;

    //显示一个新建窗口
    $scope.showAddEventDialog = function () {
      $scope.isDialogShow = true;
    };

    $scope.allDaySelected = function () {
      console.log('allDay click....' + $scope.currentEvent.allDay);

      safeApply($scope, function () {
        $scope.currentEvent.allDay = !$scope.currentEvent.allDay;
      });

      /* $scope.$apply(function () {

       });*/
    };

    //关闭
    $scope.closeAddEventDialog = function () {
      $scope.isDialogShow = false;
    };

    //保存修改
    $scope.saveAddEvent = function () {
      //$scope.$apply(function () {
      console.log('save:' + $scope.currentEvent.start);
      $scope.addEvent();
      $scope.isDialogShow = false;
      // });
    };

    /* event source that pulls from google.com */
    //noinspection JSHint
    $scope.eventSource = {
      url: '',
      className: 'gcal-event',           // an option!
      currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [//现实的事件
      {title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      //var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [
        {title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed']}
      ];
      callback(events);
    };
    /* 事件框进行点击 */
    $scope.dayOnClick = function (date, allDay, jsEvent, view) {
      $scope.$apply(function () {
        $scope.currentEvent.tilte = '';
        $scope.currentEvent.start = date;
        $scope.currentEvent.end = date;
        $scope.currentEvent.allDay = true;
        $scope.showAddEventDialog();//打开窗口
      });

    };

    //存在的事件进行点击
    $scope.eventOnClick = function (calEvent, jsEvent, view) {
      $scope.$apply(function () {
        /*$scope.currentEvent.tilte = calEvent.title;
         $scope.currentEvent.start = calEvent.start;
         $scope.currentEvent.end = calEvent.end;
         $scope.currentEvent.allDay = calEvent.allDay;*/

        $scope.currentEvent = calEvent;
        $scope.showAddEventDialog();//打开窗口
      });
      console.log('eventOnClick:' + $scope.$id + $scope.pickerConfig.dateFmt);
    };

    /* 事件进行拖动 */
    $scope.eventOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
      $scope.$apply(function () {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
      });
    };
    /* 调整大小,周视图中 */
    $scope.eventOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
      $scope.$apply(function () {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
      });
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function (sources, source) {
      var canAdd = 0;
      angular.forEach(sources, function (value, key) {
        if (sources[key] === source) {
          sources.splice(key, 1);
          canAdd = 1;
        }
      });
      if (canAdd === 0) {
        sources.push(source);
      }
    };
    /* 增加一个事件*/
    $scope.addEvent = function () {
      $scope.events.push($scope.currentEvent);
    };
    /* 删除时间 */
    $scope.remove = function (index) {
      $scope.events.splice(index, 1);
    };
    /* 改变视图，是月视图，还是日视图 */
    $scope.changeView = function (view, calendar) {
      calendar.fullCalendar('changeView', view);
    };
    /* config object */
    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        firstDay: 1,
        titleFormat: 'yyyy-MM',
        timeFormat: 'HH:mm', // 5:00 - 6:30
        axisFormat: 'HH(:mm)',
        allDayText: '全天',
        columnFormat: {
          month: 'ddd',    // Mon
          week: 'ddd MM-dd', // Mon 9/7
          day: 'dddd MM-dd'  // Monday 9/7
        },
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayClick: $scope.dayOnClick,
        eventClick: $scope.eventOnClick,
        eventDrop: $scope.eventOnDrop,
        eventResize: $scope.eventOnResize
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];

    //监听allDay是否进行了变化
    $scope.$watch('currentEvent', $scope.allDayHandler, true);
  });

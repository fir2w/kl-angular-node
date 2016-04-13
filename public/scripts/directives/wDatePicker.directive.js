'use strict';

angular.module('ui.klwork.wDatePicker', [])
  .directive('wdatePicker', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        console.log('wdatePicker link:' + scope.$id + '------' + scope.pickerConfig.dateFmt + '&&&&&' + attrs.wdatePicker);
        scope.showWdatePicker = function () {
          //绑定其id
          scope.datePickerConfig.el = attrs.id;
          console.log('id:' + attrs.id);
          WdatePicker(scope.datePickerConfig);
        };

        //更新模型
        var updateModel = function () {
          scope.$apply(function () {//$apply()是用于执行一个表达式适用于angular之外的框架
            var date = element[0].value;
            console.log('updateModel:' + date);
            if (date) {
              ngModelCtrl.$setViewValue(Date.parse(date));//将其相关的模型值进行改变
            }
          });
        };

        var onSelectHandler = function (userHandler) {
          if (userHandler) {
            // 调用者指定自己的onSelect处理程序,同时更新模型
            return function (dp) {
              updateModel();//更新模型
              return userHandler(dp);
            };
          } else {//默认的只更新模型
            return updateModel;
          }
        };

        var myBind = function (fc, opers) {
          return function () {
            fc.apply(null, [opers]);
          };
        };

        //根据配置进行设置,如果监听
        var setUpDatePicker = function (newValue, oldValue) {
          console.log('指令监听执行:' + angular.toJson(newValue) + '----------' + angular.toJson(oldValue));
          if(newValue == oldValue){
            //return;
          }
          var options = scope.$eval(attrs.wdatePicker) || {};//在scope执行datePickerConfig表达式的值
          options.onpicked = onSelectHandler(options.onpicked);//onSelect如果存在，选取值改变后，更新模型
          //如果用户更改直接在输入框的文本
          element.bind('change', updateModel);
          $dp.unbind(element);
          options.el = attrs.id;
          console.log('id:' + attrs.id);
          console.log("setUpDatePicker:" + angular.toJson(options));

          element.bind('click', function () {//绑定单击事件
            scope.$apply(function () {
              WdatePicker(options);
            });
          });


          //WdatePicker(options);

          //取消函数的绑定
          //$dp.unbind(element);
          //element.unbind('click');
          //console.log(angular.bind(WdatePicker,options));
          //重新绑定函数

          //重绘
          ngModelCtrl.$render();
        };

        //日期进行格式化
       var dateToString = function (date, allDay) {
          if(date === null){
            return '';
          }
          if (angular.isDefined(date) && date !== null && !angular.isDate(date)) {//不是一个日期对象
            throw new Error('date value must be a Date object - currently it is a ' + typeof date);
          }
          var formatStr = allDay? 'yyyy-MM-dd':'yyyy-MM-dd HH:mm';
          return date.toString(formatStr);
        };


        ngModelCtrl.$formatters.push(function (date) {
          if (angular.isDefined(date) && date !== null && !angular.isDate(date)) {//不是一个日期对象
            throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date);
          }
          var sdate = '';
          if (angular.isDate(date)) {//是一个日期对象
            sdate = date.toString(scope.pickerConfig.dateFmt);//
          }
          return dateToString(date);
        });

        //覆盖的方法
        ngModelCtrl.$render = function () {//模型的值来设置日期函数的值
          //element.datepicker("setDate", ngModelCtrl.$viewValue);
          // scope.datePickerConfig.el = attrs.id;
          console.log('render:' + (ngModelCtrl.$viewValue));
          if (ngModelCtrl.$viewValue && ngModelCtrl.$viewValue != '') {
            element.value = ngModelCtrl.$viewValue;
            // scope.datePickerConfig.startDate = ngModelCtrl.$viewValue;
          }
          // console.log('start:' + scope.datePickerConfig.startDate);
        };

        scope.$watch(attrs.wdatePicker, setUpDatePicker, true);

      }
    };
  });
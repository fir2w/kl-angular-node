angular.module('template/wdatepicker/wdatepicker.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/wdatepicker/wdatepicker.html',
    '<input id="myWdate" type=\'text\' class=\'form-control\' ng-click=\'showWdatePicker()\'/>');
}]);

angular.module('template/sidebar/sidebar-collapse.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/sidebar/sidebar-collapse.html',
    '<div id="sidebar-collapse" class="visible-lg" ng-click="toggleCollapse()">\n' +
    '    <i class="fa fa-angle-double-left"></i>\n' +
    '</div>');
}]);

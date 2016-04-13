angular.module('template/sidebar/sidebar.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/sidebar/sidebar.html',
    '<div id="sidebar" ng-class="{\'sidebar-collapsed\': collapsed}" class="navbar-collapse collapse"  ng-transclude></div>');
}]);

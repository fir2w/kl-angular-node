angular.module('templates-main', ['../app/template/sidebar/sideBar.html']);

angular.module("../app/template/sidebar/sideBar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/template/sidebar/sideBar.html",
    "<div id=\"sidebar\" class=\"navbar-collapse collapse\"  ng-transclude></div>");
}]);

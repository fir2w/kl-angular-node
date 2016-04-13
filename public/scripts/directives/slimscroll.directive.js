ngDefine('klwork.directives.slimscroll',['jquery','angular','jquery-slimscroll'], function (module,$,angular) {
  'use strict';

  module.directive('slimscroll', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var height = angular.element(element).css('height');
        angular.element(element).slimScroll(
          {
            size: '7px',
            color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#a1b2bd'),
            railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#333'),
            position: 'right',
            height: height,
            alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
            railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
            disableFadeOut: true
          }
        );
      }
    };
  });
});



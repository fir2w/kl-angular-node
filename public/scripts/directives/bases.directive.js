'use strict';

ngDefine('klwork.directives.bases', ['jquery', 'angular'], function (md, $, angular) {
  'use strict';

  md.directive('scrollif', function () {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var setUp = function (newValue, oldValue) {
          //console.log(newValue + 'sdfsdf' + oldValue);
          setTimeout(function () {
            element.scrollTop(99999999);
          }, 100);
        };
        scope.$watch(attrs.scrollif, setUp, true);
      }
    };
  });
});
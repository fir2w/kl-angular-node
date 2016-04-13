'use strict';

angular.module('klwork')
  .directive('uiNestedSortable', ['$parse', function ($parse) {

    var eventTypes = 'Create Start Sort Change BeforeStop Stop Update Receive Remove Over Out Activate Deactivate'.split(' ');

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var options = attrs.uiNestedSortable ? $parse(attrs.uiNestedSortable)() : {};

        angular.forEach(eventTypes, function (eventType) {

          var attr = attrs['uiNestedSortable' + eventType],
            callback;

          if (attr) {
            callback = $parse(attr);
            options[eventType.charAt(0).toLowerCase() + eventType.substr(1)] = function (event, ui) {
              scope.$apply(function () {

                callback(scope, {
                  $event: event,
                  $ui: ui
                });
              });
            };
          }

        });

        //note the item="{{child}}" attribute on line 17
        options.isAllowed = function (item, parent) {
          if (!parent) {return false;}
          var attrs = parent.context.attributes;
          parent = attrs.getNamedItem('item');
          attrs = item.context.attributes;
          item = attrs.getNamedItem('item');
          console.log(item, parent);
          //if ( ... ) return false;
          return true;
        };

        element.nestedSortable(options);

      }
    };
  }]);
'use strict';

angular.module('ui.klwork.filter', [])
  .filter('formatDate', function () {
    return function (value, format) {
      if (!value) {
        return value;
      }

      return value.format(format || 'yyyy-MM-dd');
    };
  });
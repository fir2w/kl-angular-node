'use strict';

angular.module('klwork')
  .filter('interpolate', ['version', function (version) //noinspection JSHint,JSHint
  {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);


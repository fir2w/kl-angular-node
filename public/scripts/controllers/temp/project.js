'use strict';

angular.module('klwork')
  .controller('ProjectCtrl', function ($scope, $timeout) {

    $scope.data = {
      children: [
        {
          title: 'hello, world',
          children: []
        }
      ]
    };

    $scope.toggleMinimized = function (child) {
      child.minimized = !child.minimized;
    };

    $scope.addChild = function (child) {
      child.children.push({
        title: '',
        children: []
      });
    };

    $scope.remove = function (child) {
      function walk(target) {
        var children = target.children,
          i;
        if (children) {
          i = children.length;
          while (i--) {
            if (children[i] === child) {
              return children.splice(i, 1);
            } else {
              walk(children[i]);
            }
          }
        }
      }

      walk($scope.data);
    };

    $scope.update = function (event, ui) {

      var root = event.target,
        item = ui.item,
        parent = item.parent(),
        target = (parent[0] === root) ? $scope.data : parent.scope().child,
        child = item.scope().child,
        index = item.index();

      target.children || (target.children = []);

      function walk(target, child) {
        var children = target.children,
          i;
        if (children) {
          i = children.length;
          while (i--) {
            if (children[i] === child) {
              return children.splice(i, 1);
            } else {
              walk(children[i], child);
            }
          }
        }
      }

      walk($scope.data, child);

      target.children.splice(index, 0, child);
    };

  });
ngDefine('klwork.directives.sidebar',['angular'], function (module, angular) {
  'use strict';
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/sidebar/menu.html',
      '<li class = \'sidebar-menu\' ng-class="{\'active\': isActive}">\n' +
        '    <a ng-click="openUrl(sign)">\n' +
        '        <i class="fa {{speicalStyle}}"></i>\n' +
        '        <span>{{menuName}}</span>\n' +
        '    </a>\n' +
        '</li>');

    $templateCache.put('template/sidebar/sidebar.html',
      '<div id="sidebar" ng-class="{\'sidebar-collapsed\': collapsed}" class="navbar-collapse collapse sidebar-collapsed"  ng-transclude></div>');

    $templateCache.put('template/sidebar/sidebar-collapse.html',
      '<div id="sidebar-collapse" class="visible-lg" ng-click="toggleCollapse()">\n' +
        '    <i class="fa fa-angle-double-left"></i>\n' +
        '</div>');
  }]);

  module
    .constant('menuConfig', {
      closeOthers: true
    }).controller('SidebarController', ['$scope', '$attrs', '$location', 'menuConfig', function ($scope, $attrs, $location, menuConfig) {
      // 所有的菜单项的scope
      this.menus = [];
      this.collapsed = true;//true表示收缩的
      this.sideShow = false;

      // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
      this.closeOtherMenus = function (openMenuScope) {//关闭其他的
        //$attrs.closeOthers如果有，parse其内容，如果没有，使用配置参数中的closeOthers
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : menuConfig.closeOthers;
        if (closeOthers) {//true
          angular.forEach(this.getMenus(), function (menuScope) {
            if (menuScope.sign !== openMenuScope.sign) {//如果和打开的作用域不一致，则设置其为isopen为false
              menuScope.isActive = false;
            }
          });
        }
      };

      this.getMenus = function () {
        return this.menus;
      };

      this.addMenu = function (menu) {
        this.getMenus().push(menu);
      };

      this.toggleCollapse = function () {//改变其isOpen值
        console.log('sdfhsdfsdf:' + this.collapsed);
        this.collapsed = !(this.collapsed);
        $scope.collapsed = this.collapsed;
      };

      //更改打开视图
      this.changePath = function (path) {
        $location.path('/' + path);
      };

    }])
    .directive('sidebar', function () {
      return {
        restrict: 'E',
        controller: 'SidebarController',
        transclude: true,
        replace: true,
        templateUrl: 'template/sidebar/sidebar.html'
      };
    })
    .directive('menu',function () {
      return {
        require: '^sidebar',         // 编译器将搜索包含从当前指令的元素开始的祖先元素
        restrict: 'EA',
        transclude: true,              // It transcludes the contents of the directive into the template
        replace: true,                // The element containing the directive will be replaced with the template
        templateUrl: 'template/sidebar/menu.html',
        scope: {
          isActive: '=?',//可选?
          menuName: '=?',
          sign: '=?',
          speicalStyle: '=?'
        },
        controller: function () {
          this.setHeading = function (element) {
            this.heading = element;
          };
        },
        link: function (scope, element, attrs, sidebarController) {
          sidebarController.addMenu(scope);

          scope.$watch('isActive', function (value) {//value为新，如果为open关闭其他,使用collapse自定义指令来进行控制
            if (value) {
              sidebarController.closeOtherMenus(scope);
            }
          });

          scope.openUrl = function (url) {//改变其isOpen值
            if (!scope.isActive) {//不是打开的，重新打开
              scope.isActive = true;
              console.log('url地址......' + url);
              sidebarController.changePath(url);
            }
          };
        }
      };
    }).directive('sidebarcollapse', function () {
      return {
        require: '^sidebar',         // 编译器将搜索包含从当前指令的元素开始的祖先元素
        restrict: 'EA',
        replace: true,                // The element containing the directive will be replaced with the template
        templateUrl: 'template/sidebar/sidebar-collapse.html',
        controller: function () {
          this.setHeading = function (element) {
            this.heading = element;
          };
        },
        link: function (scope, element, attrs, sidebarController) {
          scope.toggleCollapse = function () {//改变其isOpen值
            console.log(sidebarController);
            sidebarController.toggleCollapse();
          };
        }
      };
    });
});



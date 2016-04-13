(function (window) {
  'use strict';
  var tools = ['taffy','async','myDatePicker','underscore','myDate', 'moment_zh','klwork.tools','klwork.mocks'];
  var allService = ['module:klwork.services:./services/services','module:klwork.filters:./filters/filters'];
  var allCtrl = ['module:klwork.controllers:./controllers/controllers'];
  var allTemplates = ['module:klwork.templates:./template/templates'];
  var allDirect = ['module:klwork.directives:./directives/directives'];

  var dependencies = [ 'jquery', 'angular', 'module:ng', 'module:ngResource:angular-resource', 'module:ngRoute:angular-route','module:ngAnimateMock:angular-mocks','module:ui.bootstrap:angular-ui','module:ui.notify:angular-pines-notify','module:angularPikaday:angular-pikaday'].concat(tools,allService, allCtrl,allDirect);
  ngDefine('klwork', dependencies, function (module, $,angular) {
    'use strict';
    //var mocks_ = require('klwork.mocks');

    var RouteConfig = ['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

      var route = routeResolverProvider.route;

      module.register =
      {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
      };

      if (mocks_.isFakeData) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
      }

      //================================================
      // Check if the user is connected
      //================================================
      var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/checklogged').success(function (user) {
          // Authenticated
          if (user !== '0')//用户没有登录
            $timeout(deferred.resolve, 0);

          // Not Authenticated
          else {
            $rootScope.message = 'You need to log in.';
            $timeout(function () {
              deferred.reject();
            }, 0);
            $location.url('/login');
          }
        });

        return deferred.promise;
      };
      //================================================

      //================================================
      // Add an interceptor for AJAX errors
      //================================================
      $httpProvider.responseInterceptors.push(function ($q, $location) {
        return function (promise) {
          return promise.then(
            // Success: just return the response
            function (response) {
              return response;
            },
            // Error: check the error status to get only the 401
            function (response) {
              if (response.status === 401)
              //$location.url('#/login');
                $location.path('/login');
              return $q.reject(response);
            }
          );
        };
      });
      $routeProvider
        .when('/', {
          //templateUrl: 'views/dashboard.html',
          templateUrl: 'views/hall/hallMain.html',//大厅首页
          controller: 'HallMainCtrl'
        })
        .when('/dashboard', {//项目管理首页
          templateUrl: 'views/dashboard/dashboard.view.html',
          controller: 'DashboardCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
        })
        .when('/register', {
          templateUrl: 'views/login/register.html',
          controller: 'LoginCtrl'
        })
        .when('/forgot', {
          templateUrl: 'views/login/forgot.html',
          controller: 'LoginCtrl'
        })
        .when('/myroute', {
          templateUrl: 'views/myroute.html',
          controller: 'MyrouteCtrl'
        })
        .when('/calendar', {
          templateUrl: 'views/calendar.html',
          controller: 'CalendarCtrl'
        })
       /* .when('/team', {
          templateUrl: 'views/team/teamMain.html',
          controller: 'TeamCtrl'
          *//* resolve: {
           loggedin: checkLoggedin
           }*//*
        })*/
        .when('/team', route.resolve('teamMain', 'team/'))//taskMain
        .when('/project', {
          templateUrl: 'views/project.html',
          controller: 'ProjectCtrl'
        })
        .when('/social', {
          templateUrl: 'views/social.html',
          controller: 'SocialCtrl'
        })
        .when('/crowdsourcing', {
          templateUrl: 'views/crowdsourcing.html',
          controller: 'CrowdsourcingCtrl'
        })
        .when('/taskMain', route.resolve('taskMain', 'task/'))//taskMain

        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl'
        })
        .when('/kanban', {
          templateUrl: 'views/kanban.html',
          controller: 'KanbanCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });


    }];

    module.config(RouteConfig).run(function ($rootScope, $http, $httpBackend, $timeout, dataMockManager) {
      $rootScope.message = '';

      if (mocks_.isFakeData) {//模拟用户数据
        dataMockManager.mockHttp();
      }
      $rootScope.logout = function () {
        $rootScope.message = 'Logged out.';
        $http.post('/logout');
      };
    });

  });

})(window || this);
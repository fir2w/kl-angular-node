'use strict';

angular.module('klwork')
  .controller('NavBarCtrl', function ($scope, $rootScope, $http, $location, userManager) {

    $scope.loginUserInfo = {'id': -1, 'displayName': '未登录'};

    var loadUserInfo = function (user) {
      $scope.loginUserInfo.displayName = user.login_name_;
    };
    $scope.menus = [
      {title:'任务大厅',sign: '', isActive: false, speicalStyle: 'btn-success'},
      {title:'创业知识汇',sign: 'xx', isActive: false, speicalStyle: 'btn-primary'},
      {title:'项目管理',sign: 'dashboard', isActive: false, speicalStyle: 'btn-primary'}
    ];


    //切换url
    $scope.buttonSelected = function (sign) {
    };

    //切换url
    $scope.changeUrl = function (url) {
      angular.forEach($scope.menus, function (menu) {
        if (menu.sign !== url) {//如果和打开的作用域不一致，则设置其为isopen为false
          menu.isActive = false;
          menu.speicalStyle='btn-primary';
        }else {
          menu.isActive = true;
          menu.speicalStyle='btn-success';
        }
      });
      $location.url('/' + url);
    };

    $http.init = function () {
      //初始化进行用户是否登录检查
      $http.get('/checklogged').success(function (user) {
        // Authenticated
        if (user !== '0') {//用户登录
          //loadUserInfo(user);
          userManager.setLoginUser(user);
          if (!mocks_.isFakeData) {
            userManager.initLoginUserData(user);
          } else {
            userManager.noticeUserDataReaded();
          }
        }
      });
    };

    //用户重新进行了登录
    $scope.$on('UserChanged',
      function (event, user) {
        console.log('UserChanged', user);
        loadUserInfo(user);
      });

    $http.init();

  });

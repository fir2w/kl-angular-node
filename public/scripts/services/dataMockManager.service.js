ngDefine('klwork.services', function (md) {
  'use strict';

  md.factory('dataMockManager', function ($httpBackend, $timeout, $rootScope, userManager) {

    return {
      mockHttp: function () {
        //麽您数据
        userManager.initFakeData();
        var loginUser = userManager.queryUserById('userId2');
        userManager.setLoginUser(loginUser);

        //*******************************************
        // Allow JSONP to pass to external services (ie Solr)
        $httpBackend.when('JSONP', tools_.regexpUrl(/http:\/\/.*/)).passThrough();
        $httpBackend.whenGET(/views\/.*/).passThrough();
        //$httpBackend.whenGET(/http:\/\/.*/).passThrough();

        $httpBackend.when('GET', tools_.regexpUrl(/\/checklogged/))
          .respond(function (method, url, data) {
            return [200, loginUser];
          });

        ///:userId/tasks/inbox,用户相关的任务
        $httpBackend.when('GET', tools_.regexpUrl(/\/task-engine\/tasks\?assignee=userId2/))
          .respond(function (method, url, data) {
           /* var teams = [
            ];*/
            return [200, mocks_.inboxTaskList];
          });


        $httpBackend.when('GET', tools_.regexpUrl(/\/tasks\/e5812640-c5dc-11e3-bea8-00155d006401\/identitylinks/))
          .respond(function (method, url, data) {
            console.log(url);
            /* var teams = [
             ];*/
            return [200, mocks_.taskIdentitylinks1.data];
          });

        $httpBackend.when('GET', tools_.regexpUrl(/\/tasks\/f7980a12-c5dc-11e3-bea8-00155d006401\/identitylinks/))
          .respond(function (method, url, data) {
            console.log(url);
            /* var teams = [
             ];*/
            return [200, mocks_.taskIdentitylinks1.data];
          });

        $httpBackend.when('POST', tools_.regexpUrl(/\/tasks\/publishNeed/))
          .respond(function (method, url, data) {
            var teams = [
              {email_: 'user2@126.com', login_name_: 'user2', id_: 'userId2', screen_name_: 'user2'},
              {email_: 'user3@126.com', login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'}
            ];
            return [200, tools_.getSuccessObj(teams)];
          });

        /*$httpBackend.when('GET', tools_.regexpUrl(/\/userId2\/teams/))
         .respond(function (method, url, data) {
         var teams = $rootScope.dbTeams({own_user_: 'userId2'}).get();
         console.log('查询的teams:' + JSON.stringify(teams));
         return [200, tools_.getSuccessObj(teams)];
         });

         $httpBackend.when('GET', tools_.regexpUrl(/\/teams\/teamId2\/members/))
         .respond(function (method, url, data) {
         var members = $rootScope.dbUsers()
         .join($rootScope.dbTeamMembers,function (l, r) {
         return (l.id_ === r.user_id_ && r.team_id_ === 'teamId2');
         }).get();

         return [200, tools_.getSuccessObj(members)];
         });

         $httpBackend.when('GET', tools_.regexpUrl(/\/teams\/teamId3\/members/))
         .respond(function (method, url, data) {
         var members = $rootScope.dbUsers()
         .join($rootScope.dbTeamMembers,function (l, r) {
         return (l.id_ === r.user_id_ && r.team_id_ === 'teamId3');
         }).get();


         return [200, tools_.getSuccessObj(members)];
         });

         ///teams/teamId2/optmembers
         $httpBackend.when('GET', tools_.regexpUrl(/\/teams\/teamId2\/optmembers/))
         .respond(function (method, url, data) {
         var teams = [
         ];
         return [200, tools_.getSuccessObj(teams)];
         });

         $httpBackend.when('GET', tools_.regexpUrl(/\/teams\/teamId3\/optmembers/))
         .respond(function (method, url, data) {
         var teams = [
         {email_: 'user2@126.com', login_name_: 'user2', id_: 'userId2', screen_name_: 'user2'},
         {email_: 'user3@126.com', login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'}
         ];
         return [200, tools_.getSuccessObj(teams)];
         });

         $httpBackend.when('POST', tools_.regexpUrl(/\/teams\/teamId3\/members/))
         .respond(function (method, url, data) {
         var teams = [
         {email_: 'user2@126.com', login_name_: 'user2', id_: 'userId2', screen_name_: 'user2'},
         {email_: 'user3@126.com', login_name_: 'user3', id_: 'userId3', screen_name_: 'user3'}
         ];
         return [200, tools_.getSuccessObj(teams)];
         });*/

        // A "run loop" of sorts to get httpBackend to
        // issue responses and trigger the client code's callbacks
        var flushBackend = function () {
          try {
            $httpBackend.flush();
          } catch (err) {
            // ignore that there's nothing to flush
          }
          $timeout(flushBackend, 500);
        };
        $timeout(flushBackend, 500);
      }
    };
  });
});

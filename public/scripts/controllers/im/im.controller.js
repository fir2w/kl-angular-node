define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('klwork.controllers');

  module
    .controller('ImCtrl', function ($scope, $rootScope, $location, socketio, userManager) {


      $scope.groupsStatus = {};//记录每个组的状态

      //初始化
      $scope.init = function () {
        //当前用户所有的相关的组
        $scope.groups = userManager.queryUserInTeams();
        for (var i = 0; i < $scope.groups.length; i++) {
          var group = $scope.groups[i];
          $scope.groupsStatus[group.id_ + ''] = {expend: false};//默认为不展开
          group.members = userManager.queryTeamOfMembers(group.id_);
        }
      };


      $scope.queryTeamOfMembers = function (teamId) {
        var members = userManager.queryTeamOfMembers(teamId);
        return members;
      };


      $scope.chattingUsers = [];//正在聊天的用户


      $scope.checkCurrentUser = function (userId) {//是否为当前用户
        return $scope.dialog.currentUserId === userId;
      };

      $scope.changeChatUser = function (userId) {//切换聊天用户
        $scope.dialog.currentUserId = userId;//
        $scope.dialog.disTitle = 'test' + userId;
        $scope.dialog.scrollIf = new Date().getTime();
      };


      $scope.queryGroupStatus = function (groupId) {//查询出状态对象
        return $scope.groupsStatus[groupId + ''];
      };

      //双击组,进行切换
      $scope.toggleGroup = function (groupId) {
        console.log(groupId);
        var status = $scope.queryGroupStatus(groupId);
        status.expend = !status.expend;
      };

      //得到指定组的显示状态, true为展开组
      $scope.isGroupShow = function (groupId) {
        var status = $scope.queryGroupStatus(groupId);
        if (status.expend)
          return true;
        else
          return false;
      };


      $scope.expandPanel = {};//展开框
      $scope.miniPanel = {};//小框
      $scope.dialog = {};//聊天框

      //显示
      $scope.expandPanel.show = false;//默认最小化
      $scope.expandPanel.hiddenPanel = function () {//缩小窗口
        $scope.expandPanel.show = false;
      };

      //--------------------------mini
      $scope.miniPanel.hoverShow = false;//加入一个hover样 式
      $scope.miniPanel.toMax = function () {//展开ie窗口
        $scope.expandPanel.show = true;
      };

      //--------------------------dialog
      $scope.dialog.currentUserId = '';//当前正在聊天的用户id
      $scope.dialog.chatInputMessage = '';//当前发送的信息文本

      $scope.dialog.show = false;//默认最小化
      $scope.dialog.minShow = false;//小框显示
      $scope.dialog.minCssCol2 = true;
      $scope.dialog.chatInputMessage = '';//当前发送的信息文本

      $scope.dialog.disTitle = '';
      $scope.dialog.scrollIf = 0;//默认不进行滚动

      //缩小窗口
      $scope.dialog.toMin = function () {
        $scope.dialog.minCssCol2 = false;
        $scope.dialog.show = false;//不显示大框
        $scope.dialog.minShow = true;//显示小框
        $scope.dialog.disTitle = 'test*' + $scope.dialog.currentUserId;
      };

      //最大化窗口
      $scope.dialog.toMax = function () {
        $scope.dialog.minCssCol2 = false;
        $scope.dialog.show = true;//显示大框
        $scope.dialog.minShow = false;//显示小框
        $scope.dialog.disTitle = '';//("span#span_wbim_min_nick").text("");
      };

      //对话框关闭
      $scope.dialog.toClose = function () {
        $scope.dialog.show = false;//不显示大框
        $scope.dialog.minCssCol2 = true;
      };

      //打开聊天窗口
      $scope.dialog.openImDialog = function (userId) {
        //
        var openUser = userManager.queryUserById(userId);//查询用户

        var isInclude = tools_.containsById($scope.chattingUsers, openUser);
        if (!isInclude) {//新增加的用户，加入
          //将聊天记录,附加到其中
          var msgs = userManager.queryUserMessages(userId);
          openUser.msg = msgs;
          $scope.chattingUsers.push(openUser);
        }

        $scope.dialog.show = true;//
        $scope.dialog.currentUserId = userId;
      };

      //查询正在聊天的用户
      var queryUserFromChatting = function (userId) {
        var selectUser = null;//消息接受者用户对象
        for (var i = 0; i < $scope.chattingUsers.length; i++) {//找到发送消息用户
          selectUser = $scope.chattingUsers[i];
          if (selectUser.id_ === userId) {
            break;
          }
        }
        return selectUser;
      };

      //发送消息
      $scope.dialog.sendMessage = function () {

        var toUser = queryUserFromChatting($scope.dialog.currentUserId);//消息接受者用户对象
        var message = $scope.dialog.chatInputMessage;//原始消息
        //console.log('message...' + message);
        var sends = message.split('\n');
        var strx = [];
        for (var x = 0; x < sends.length; x++) {
          //strx.push(sends[x].replace(/\s/g, '&nbsp;'));
          strx.push(sends[x]);
        }
        var messageObj = {send_time_: new Date().toString('yyyy-MM-dd HH:mm'), ptext_: strx, to_user_: toUser.id_, from_user_: userManager.getLoginUserId()};
        //保存到用户对象中
        toUser.msg.push(messageObj);
        //清空发送框
        $scope.dialog.chatInputMessage = '';
        $scope.dialog.scrollIf = toUser.msg.length;//进行滚动
        //发送消息
        socketio.emit('message', messageObj, function (message) {//回调用来进行消息的确认
          if (message != null) {
            console.log('发送消息成功...');
            userManager.insertMessage(message);
          }
        });

      };

      socketio.on('send:time', function (data) {
        $scope.time = data.time;
      });

      socketio.on('connect', function () {
        console.log('client connect.........');
      });

      //从服务器接受消息
      socketio.on('receiveMessage', function (messageObj) {
        console.log('接受消息: ' + messageObj);
        if (messageObj.from_user_) {
          var toUser = queryUserFromChatting(messageObj.from_user_);
          if (toUser != null) {
            //保存到localdb
            userManager.insertMessage(messageObj);
            toUser.msg.push(messageObj);//
            $scope.dialog.scrollIf = toUser.msg.length;//进行滚动;
          }
        }
      });

      //有用户请求聊天
      socketio.on('requestTalkStart', function (messageObj,callbackFn) {
        console.log('用户请求聊天: ' + messageObj);
        if (messageObj.from_user_) {
          $scope.dialog.openImDialog(messageObj.from_user_);//打开聊天对话框
          var toUser = queryUserFromChatting(messageObj.from_user_);
          if (toUser) {
            $scope.dialog.scrollIf = toUser.msg.length;//进行滚动;
          }
          callbackFn(true);
        }else {
          callbackFn(false);
        }
      });

      //请求成功
      $scope.$on('requestTalkRecive',
        function (event, messageObj) {
          if (messageObj.to_user_) {
            $scope.dialog.openImDialog(messageObj.to_user_);//打开聊天对话框
            var toUser = queryUserFromChatting(messageObj.to_user_);
            if (toUser) {
              $scope.dialog.scrollIf = toUser.msg.length;//进行滚动;
            }
          }
        });

      $scope.$on('UserInitDataReaded',
        function (event, teams) {
          console.log('UserInitDataReaded');
          $scope.init();
        });

      //$scope.init();
    });

});

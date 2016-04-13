/*
 * Serve content over a socket
 */
'use strict';

var MessageService = require('../services/messageService');
var joinUsers = {};

module.exports = function (socket) {

  //用户发送新的消息
  socket.on('message', function (messageObj, callbackFn) {
    console.log('用户发来了消息...');
    if (messageObj.to_user_) {
      console.log(messageObj.from_user_ + '...接受消息...' + messageObj.to_user_);
      //保存新的消息
      MessageService.save(messageObj).on('success', function (message) {
        //找到发送目的人
        var userSocket = joinUsers[messageObj.to_user_ + ''];
        if (userSocket) {//给他发送一个接受消息
          userSocket.emit('receiveMessage', messageObj);
        }
        //保存成功进行回调
        callbackFn(message);
      }).on('error', function (err) {
        callbackFn(null);
      });
    }
  });

  //某个用户请求和另一个用户交谈
  socket.on('requestTalk', function (messageObj, callbackFn) {
    console.log('用户requestTalk...');
    if (messageObj.to_user_) {
      console.log(messageObj.from_user_ + '请求 ' + messageObj.to_user_ + ' 接受消息');
      //找到请求人
      var userSocket = joinUsers[messageObj.to_user_ + ''];
      if (userSocket) {//给他发送一个接受消息
        userSocket.emit('requestTalkStart', messageObj,function (ret) {//回调用来进行消息的确认
          //保存成功进行回调
          callbackFn(ret);
        });

      }else{
        callbackFn(false);
      }


    }
  });


  //用户加入
  socket.on('join', function (userId) {
    console.log('用户加入socket......' + userId);
    joinUsers[userId + ''] = socket;
  });
};

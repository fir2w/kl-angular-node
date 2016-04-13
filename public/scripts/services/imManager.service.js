ngDefine('klwork.services', function (module) {
  'use strict';
  module.factory('imManager', function ($http, $rootScope, socketio) {

    return {
      requestTalk: function (fromUserId,toUserId) {
        var messageObj = {};
        messageObj.to_user_ = toUserId;
        messageObj.from_user_ = fromUserId;
        console.log('requestTalk:' + messageObj.from_user_ + ':' + messageObj.to_user_);
        socketio.emit('requestTalk', messageObj, function (ret) {//回调用来进行消息的确认
          if (ret) {
            $rootScope.$broadcast('requestTalkRecive', messageObj);//向下广播
          }
        });
      }
    };
  });

});

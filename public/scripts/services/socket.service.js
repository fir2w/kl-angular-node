ngDefine('klwork.services.socket', ['angular'], function (module, angular) {
  'use strict';

  module.
    provider('socketFactory',function () {

      // when forwarding events, prefix the event name
      var defaultPrefix = 'socket:',
        ioSocket;

      // expose to provider
      this.$get = function ($rootScope, $timeout) {

        var asyncAngularify = function (socket, callback) {
          return callback ? function () {
            var args = arguments;
            $timeout(function () {
              callback.apply(socket, args);
            }, 0);
          } : angular.noop;
        };

        return function socketFactory(options) {
          options = options || {};
          var socket = options.ioSocket || io.connect();
          var prefix = options.prefix || defaultPrefix;
          var defaultScope = options.scope || $rootScope;

          var addListener = function (eventName, callback) {
            socket.on(eventName, asyncAngularify(socket, callback));
          };

          var wrappedSocket = {
            on: addListener,
            addListener: addListener,

            emit: function (eventName, data, callback) {
              return socket.emit(eventName, data, asyncAngularify(socket, callback));
            },

            removeListener: function () {
              return socket.removeListener.apply(socket, arguments);
            },

            // when socket.on('someEvent', fn (data) { ... }),
            // call scope.$broadcast('someEvent', data)
            forward: function (events, scope) {
              if (events instanceof Array === false) {
                events = [events];
              }
              if (!scope) {
                scope = defaultScope;
              }
              events.forEach(function (eventName) {
                var prefixedEvent = prefix + eventName;
                var forwardBroadcast = asyncAngularify(socket, function (data) {
                  scope.$broadcast(prefixedEvent, data);
                });
                scope.$on('$destroy', function () {
                  socket.removeListener(eventName, forwardBroadcast);
                });
                socket.on(eventName, forwardBroadcast);
              });
            }
          };

          return wrappedSocket;
        };
      };
    }).factory('socketio', function (socketFactory) {
      if (mocks_.isFakeData) {//模拟用户数据//模拟ioSocket,方便调试
        var options = {};
        options.ioSocket = mocks_.fake.mockSio;

        return socketFactory(options);
      }
      return socketFactory();
    });
});
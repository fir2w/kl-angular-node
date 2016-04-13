/* global ngDefine: false */
/**
 * A notifications module to be used in client side applications.
 *
 */
ngDefine('klwork.services.notificationManager', [ 'angular' ], function (module, angular) {
  'use strict';
  var ServiceProducer = function ServiceProducer($filter, notificationService) {
    return {
      addMessage: function (message) {
        if (!message.type) {
          message.type = 'info';//"notice", "info", "success", or "error".
        }
        message.delay = 800;
        //message.nonblock = true;
        message.remove = true;
        message.hide = true;
        message.styling = 'bootstrap3';
        //message.history = false;
        notificationService.notify(message);
      }

    };
  };

  ServiceProducer.$inject = [ '$filter', 'notificationService' ];

  module.service('notificationManager', ServiceProducer);
});

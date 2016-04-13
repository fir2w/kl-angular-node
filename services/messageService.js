'use strict';
var User = require('../models/userModel');
var ImMessage = require('../models/imMessageModel');
var tools = require('../lib/util/tools.js');
var db = require('../lib/database').sequelize();

var MessageServiceConstruct = (function () {
  var MessageService = function () {
  };
  MessageService.prototype.save = function (messageObj) {
    return new tools.CustomEventEmitter(function (myCusemitter) {
      messageObj.id_=tools.getUUID();
      var message = ImMessage.build(messageObj);
      message.save().error(function (err) {
        myCusemitter.emit('error', err);
      }).success(function (messageObject) {
          myCusemitter.emit('success', messageObject);
        });
    }).run();
  };
  return MessageService;
})();


module.exports = new MessageServiceConstruct();
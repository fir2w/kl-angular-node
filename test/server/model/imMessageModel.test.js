/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var request = require('supertest'),
  tools = require('../../../lib/util/tools.js'),
  should = require('should');
var ImMessage = require('../../../models/imMessageModel');
var db = require('../../../lib/database').sequelize();

describe('ImMessage', function () {

  it('创建和保存', function (done) {

    ImMessage.sync({ force: false }).success(function () {
      var message = ImMessage.build({send_time_: new Date(), to_user_: 'userId2', from_user_: 'userId1', ptext_: '我是谁', id_: tools.getUUID()});
      message.save().error(function (err) {
        done(err);
      }).success(function (messageObject) {
          done();
          /*messageObject.destroy().success(function () {
           done();
           });*/
        });
    });
  });

});
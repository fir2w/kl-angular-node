/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../../../index'),
  db = require('../../../lib/database'),
  kraken = require('kraken-js'),
  request = null,
  should = require('should');
var Team = require('../../../models/teamModel');
var MessageService = require('../../../services/messageService');
var cleanDB = require('../../lib/cleanDB.js')();

describe('MessageService', function () {

  it('save', function (done) {
    var messageObj = {send_time_: new Date(), to_user_: 'userId2', from_user_: 'userId1', ptext_: '我是谁'};
    MessageService.save(messageObj).on('success',function (message) {
      message.should.have.property('to_user_', 'userId2');
      done();
    }).on('error', function (err) {
        done(null);
      });
  });

});
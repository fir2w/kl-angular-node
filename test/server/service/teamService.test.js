/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../../../index'),
  db = require('../../../lib/database'),
  kraken = require('kraken-js'),
   request = null,
  should = require('should');
var Team = require('../../../models/teamModel');
var TeamService = require('../../../services/teamService');
var cleanDB = require('../../lib/cleanDB.js')();

describe('TeamService', function () {

  it('查询一个用户下的team', function (done) {
    //
    TeamService.queryMyTeams('userId3').on('success', function(teams) {
      teams.should.be.instanceof(Array).and.have.lengthOf(1);
      done();
    });
  });

});
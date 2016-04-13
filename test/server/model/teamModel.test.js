/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var request = require('supertest'),
  tools = require('../../../lib/util/tools.js'),
  should = require('should');
var Team = require('../../../models/teamModel');
var db = require('../../../lib/database').sequelize();

describe('Team', function () {

  it('teamSave', function (done) {
    var team = Team.build({name_: 'myTeam', id_: tools.getUUID()});
    team.save().error(function (err) {
      done(err);
    }).success(function (teamObj) {
        teamObj.destroy().success(function () {
          done();
        });
      });
  });

});
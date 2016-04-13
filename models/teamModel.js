'use strict';
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');
var User = require('./userModel');

var Team = db.define('Team', {
    id_ : {type : DataTypes.STRING, primaryKey : true, unique : true},
    own_user_: DataTypes.STRING,
    name_: DataTypes.STRING,
    type_: DataTypes.STRING
  },{
    tableName: 'team',
    timestamps: true
  }
);

User.hasMany(Team, {as: 'myTeams',foreignKey: 'own_user_'});

module.exports = Team;
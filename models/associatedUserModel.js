'use strict';
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');
var Team = require('./teamModel');
var User = require('./userModel');
//关联的用户
var AssociatedUser = db.define('AssociatedUser', {
    id_: {type: DataTypes.STRING, primaryKey: true, unique: true},
    status_: DataTypes.STRING,
    rel_user_: DataTypes.STRING,
    own_user_: DataTypes.STRING
  },{
    tableName: 'associated_user',
    timestamps: false
  }
);


module.exports = AssociatedUser;


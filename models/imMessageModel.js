'use strict';
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');

var ImMessage = db.define('ImMessage', {
    id_: {type: DataTypes.STRING, primaryKey: true, unique: true},
    from_user_: DataTypes.STRING,
    to_user_: DataTypes.STRING,
    ptext_: DataTypes.STRING,
    stext_: DataTypes.STRING,
    send_time_: DataTypes.DATE
  }, {
    tableName: 'im_message'
  }
);

module.exports = ImMessage;
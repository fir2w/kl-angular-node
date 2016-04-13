'use strict';
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');
var User = require('./userModel');

var TaskAttachment = db.define('TaskAttachment', {
    id_ : {type : DataTypes.STRING(64), primaryKey : true, unique : true},
    rev_: DataTypes.INTEGER,
    user_id_: DataTypes.STRING,
    name_: DataTypes.STRING,
    description_: DataTypes.STRING(4000),
    type_: DataTypes.STRING,
    task_id_: DataTypes.STRING(64),
    proc_inst_id_: DataTypes.STRING(64),
    url_: DataTypes.STRING(4000),
    content_id_: DataTypes.STRING(64)
  },{
    tableName: 'act_hi_attachment'
  }
);


module.exports = TaskAttachment;
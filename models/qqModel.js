/**
 * Created by ww on 14-3-17.
 */
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');

var QQ = db.define('QQ', {
    id_: {type: DataTypes.STRING, primaryKey: true, unique: true},
    rev_: DataTypes.STRING,
    first_: DataTypes.STRING,
    last_: DataTypes.STRING,
    email_: DataTypes.STRING,
    pwd_: DataTypes.STRING,
    picture_id_: DataTypes.STRING,
    salt_: DataTypes.STRING,
    hash_: DataTypes.STRING,
    screen_name_: DataTypes.STRING,
    login_name_: DataTypes.STRING
  }, {
    tableName: 'act_id_user',
    timestamps: true
  }
);

module.exports = QQ;
'use strict';
var db = require('../lib/database').sequelize();
var DataTypes = require('sequelize');
var Team = require('./teamModel');
var User = require('./userModel');

var TeamMember = db.define('TeamMember', {
    id_: {type: DataTypes.STRING, primaryKey: true, unique: true},
    user_id_: DataTypes.STRING,
    team_id_: DataTypes.STRING

  },{
    tableName: 'team_membership',
    timestamps: false
  }
);

/*TeamMember.belongsTo(Team, {
  foreignKey: 'team_id_'
});
TeamMember.belongsTo(User,{
  foreignKey: 'user_id_'
});*/

User.hasMany(Team, { foreignKey: 'user_id_',through: TeamMember,as:'myInTeams'});
Team.hasMany(User, { foreignKey: 'team_id_',through: TeamMember,as:'includeUsers'});
//TeamMember.sync({force:true});

module.exports = TeamMember;


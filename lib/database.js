/**
 * A custom library to establish a database connection
 */
'use strict';
var Sequelize = require('sequelize');
var nconf = require('nconf');
var myConf = require('../config/app.json');
var mySequelize = null;
var db = function () {
  return {

    /**
     * Open a connection to the database
     * @param conf
     */
    config: function (conf) {
      console.log('db..config...' + conf.database);
      mySequelize = new Sequelize(conf.database, conf.username, conf.password, {
        host: conf.host,
        dialect: 'postgres',
        define: { timestamps: false, paranoid: false, underscored: true,freezeTableName: true,
          updatedAt: 'updated_at_',
          createdAt: 'created_at_'
        }//,
      });
    },
    sequelize: function () {
      if(mySequelize == null){
        this.config(myConf.database.test);
      }
      return mySequelize;
    }
  };
};
module.exports = db();
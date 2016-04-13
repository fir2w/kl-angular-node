/**
 * A custom library to establish a database connection
 */
'use strict';
var cusQuery = null;
var nconf = require('nconf');
var myConf = require('../config/app.json');
var pg = function () {
  return {

    /**
     * Open a connection to the database
     * @param conf
     */
    config: function (conf) {
      cusQuery = require('pg-query');
      cusQuery.connectionParameters = 'postgres://' + conf.username + ':' + conf.password + '@' +
        conf.host + ':' + "5432/" + conf.database;
      console.log(cusQuery.connectionParameters);
    },
    query: function () {
      if (cusQuery == null) {
        this.config(myConf.database.test);
      }
      return cusQuery;
    }
  };
};
module.exports = pg();
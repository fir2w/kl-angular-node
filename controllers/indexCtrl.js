'use strict';
var nconf = require('nconf');


module.exports = function (server) {

  server.get('/', function (req, res) {
    //res.redirect('app/index.js');
    res.render('index');
  });
};

/**
 * Module that will handle our authentication tasks
 */
'use strict';

var User = require('../models/userModel'),
  LocalStrategy = require('passport-local').Strategy;


/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.isAuthenticated = function (role) {

  return function (req, res, next) {

    if (!req.isAuthenticated()) {

      //If the user is not authorized, save the location that was being accessed so we can redirect afterwards.
      req.session.goingTo = req.url;
      res.redirect('/login');
      return;
    }

    //If a role was specified, make sure that the user has it.
    if (role && req.user.role !== role) {
      res.status(401);
      res.render('errors/401');
      return;
    }

    next();
  };
};

/**
 * A helper method to add the user to the response context so we don't have to manually do it.
 * @param req
 * @param res
 * @param next
 */
exports.injectUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

exports.userExist = function (req, res, next) {

  User.count({where: {email_: req.body.email}}, {logging: false}).on('success',function (count) {
    if (count === 0) {
      next();
    } else {//重复
      res.send('0');//0表示错误
    }
  }).on('failure', function (err) {
      throw err;
    });
}

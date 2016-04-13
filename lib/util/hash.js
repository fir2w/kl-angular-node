
// check out https://github.com/visionmedia/node-pwd

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

module.exports = function (pwd, salt, fn) {
  if (3 == arguments.length) {
    console.log("3salt:" + salt);
    crypto.pbkdf2(pwd, salt, iterations, len, fn);//异步PBKDF2提供了一个伪随机函数 HMAC-SHA1，
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){//两个参数，生成一个随机的
      if (err) return fn(err);
      salt = salt.toString('base64');
      console.log("2salt:" + salt);
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, hash);
      });
    });
  }
};

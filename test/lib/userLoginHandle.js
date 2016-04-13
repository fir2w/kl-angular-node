var superagent = require('superagent');
var agent = superagent.agent();
var theAccount = { email: 'user1@126.com', 'password': '123456'};

exports.login = function (request, done) {
  request
    .post('/login')
    .send(theAccount)
    .end(function (err, result) {
      if (err) {
        throw err;
      }
      agent.saveCookies(result.res);
      done(agent);
    });
};
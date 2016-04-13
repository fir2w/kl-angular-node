var initDbData = require('./initDbData.js');
//控制多个只有一个执行成功
var beforeEachRegistered = false;

module.exports = function () {

  if (!beforeEachRegistered) {
    if ('function' == typeof beforeEach && beforeEach.length > 0) {
      // we're in a test suite that hopefully supports async operations
      beforeEach(clearDB);
      beforeEachRegistered = true;
    }
  }


  function clearDB(done) {
    console.log('clear db start .............');
    //done();
    initDbData.init(done);
  }

  //入口
  return function (done) {
    clearDB(done);
  };

};

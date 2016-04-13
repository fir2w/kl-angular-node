/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var tools = require('../../lib/util/tools.js'),
  should = require('should');


describe('工具测试', function () {

  it('copySpecialValue', function () {
    var dest = {name: '123', value: 'asdsdf'};
    var src = {name: '456', id: '45'};
    tools.copyValue(dest, src);
    dest.should.have.property('name', '456');
    dest.should.not.have.property('id');

    tools.copySpecialValue(dest, src, ['id']);
    dest.should.have.property('id', 45);
  });

  describe('camelizeIf', function () {
    it('is defined', function (done) {
      tools._.camelizeIf.should.be.ok;
      done();
    });

    it('camelizes if second param is true', function (done) {
      tools._.camelizeIf('foo_bar', true).should.equal('fooBar');
      done();
    });

    it("doesn't camelize if second param is false", function (done) {
      tools._.underscoredIf('fooBar', true).should.equal('foo_bar');
      done();
    });
  });

});
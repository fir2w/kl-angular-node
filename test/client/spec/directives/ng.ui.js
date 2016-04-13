'use strict';

describe('Directive: ng.ui', function () {

  // load the directive's module
  beforeEach(module('klwork'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng.ui>this is the ng.ui directive</ng.ui>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ng.ui directive');
  }));
});

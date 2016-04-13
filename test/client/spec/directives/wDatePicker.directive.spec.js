describe('date-picker directive', function () {
  var $compile, $rootScope;

  beforeEach(module('ui.klwork.wDatePicker'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

  }));

  describe('simple use on input element', function () {
    xit('should be able to get the date from the model', function () {
      var aDate = new Date(2014, 03, 01);
      $rootScope.x = aDate;
      $rootScope.y = {dateFmt: 'yyyy-MM-dd', startDate: '2014-03-01'};
      var element = $compile("<input wdatepicker date-picker-config='y' ng-model='x'/>")($rootScope);
      $rootScope.$digest();

      $rootScope.y = {dateFmt: 'yyyy-MM-dd', startDate: '2014-03-02'};
      $rootScope.$digest();
      element.trigger("click");//显示

      //expect(element.datepicker('getDate')).toEqual(dateObj);
      expect(element.val()).toEqual('2014-03-02');
      //expect(element.datepicker('getDate')).toEqual(aDate);
      //dpOkInput
    });

  });

});
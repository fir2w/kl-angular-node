/**
 * Created by ww on 14-2-26.
 */

describe('pagination directive', function () {
  var $scope, element, lis, compile;
  beforeEach(module('ui.klwork.uiTreetable'));
  beforeEach(inject(function ($compile, $rootScope) {
    $scope = $rootScope;
    compile = $compile;
  }));

  xit('传递参数', function () {
    $scope.treeConfig = {expandable: true, clickableNodeNames: true, refId: 'example-advanced'};
    var element = compile("<table id='example-advanced'><tbody><tr data-tt-id='1'><td>asdfsdf2</td><td>480.95 KB</td></tr></tbody></table><div ui-treetable='treeConfig'></div>")($scope);
    $scope.$digest();
    expect(element.find('tr').length).toBe(1);
    var tr = element.find('tr').eq(0);
    console.log(tr[0].outerHTML);
    expect(tr.hasClass('collapsed')).toBe(true);//关着的
    expect(tr.hasClass('leaf')).toBe(true);
  });

  it('子菜单生成', function () {
    $scope.treeConfig = {expandable: false, clickableNodeNames: true};
    $scope.todolist = [
      {id_: '1', pid_: '', name_: 'test1'},
      {id_: '2', pid_: '', name_: 'test2'},
      {id_: '3', pid_: '2', name_: 'test3'},
      {id_: '4', pid_: '2', name_: 'test4'},
      {id_: '5', pid_: '', name_: 'test5'}
    ];

    var element = compile('<ui-treetable tree-config ="treeConfig">'
      + '<ui-treetable-item item-data="todo" ng-repeat="todo in todolist"  ' +
      ' />' +
      '<ui-treetable/>')($scope);
    $scope.$digest();
    expect(element.find('tr').length).toBe(6);//加上tilte = 6
   // var tr = element.find('tr').eq(0);
    console.log(element[0].outerHTML);
    /* expect(tr.hasClass('collapsed')).toBe(false);
     expect(tr.hasClass('expanded')).toBe(true);
     expect(tr.hasClass('leaf')).toBe(true);*/
  });


});
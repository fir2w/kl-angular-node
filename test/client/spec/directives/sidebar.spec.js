/**
 * Created by ww on 14-2-26.
 */
describe('sidebar测试', function () {
  var $compile, $rootScope;

  beforeEach(module('ui.klwork.sidebar'));
  beforeEach(module('template/sidebar/sidebar.html'));
  beforeEach(module('template/sidebar/menu.html'));
  beforeEach(module('template/sidebar/sidebar-collapse.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    console.log('控制器' + $rootScope);
  }));

  describe('控制器测试', function () {
    console.log('控制器' + $rootScope);
    var ctrl, $element, $attrs;
    beforeEach(inject(function ($controller) {
      $attrs = {};
      $element = {};
      ctrl = $controller('SidebarController', { $scope: $rootScope, $element: $element, $attrs: $attrs });
    }));

    describe('addMenu', function () {
      it('增加一个menu到控制器的集合中', function () {
        var group1, group2;
        ctrl.addMenu(group1 = $rootScope.$new());
        ctrl.addMenu(group2 = $rootScope.$new());
        expect(ctrl.getMenus().length).toBe(2);

        expect(ctrl.getMenus()[0]).toBe(group1);
        expect(ctrl.getMenus()[1]).toBe(group2);
      });
    });

  });

  describe('accordion-group', function () {

    it('编译为一个模板', function () {
      var element = $compile('<sidebar>asdfsfd</sidebar>')($rootScope);
      $rootScope.$digest();
      // console.log(element.eq(0));
      expect(element.eq(0).hasClass('collapse')).toBe(true);

      /*  var result = element.find('.sidebar');
       expect(result.length).toEqual(1);*/
    });
  });

  describe('多个菜单的创建', function () {

    it('sidebarCollapseDt的创建', function () {
      var tpl =
        '<sidebar><menu></menu><sidebarcollapse></sidebarcollapse></sidebar>';
      var element = angular.element(tpl);
      $compile(element)($rootScope);//第一次编译
      $rootScope.$digest();
      //console.log(element);
      var sidebarCollapse = element.find('#sidebar-collapse');
      expect(sidebarCollapse.length).toEqual(1);
    });

    it('多个菜单的创建', function () {
      var tpl =
        '<sidebar>' +
          '<menu ng-repeat="menu in menus" menu-name="menu.menuName" is-active="menu.isActive" sign="menu.sign" ' +
          'speical-style="menu.speicalStyle" />' +
          '<sidebarcollapse/>' +
          '</sidebar>';
      var element = angular.element(tpl);
      var model = [
        {menuName: '项目管理', sign: 'project', speicalStyle: 'fa-desktop', isActive: true},
        {menuName: '任务管理', sign: 'task', speicalStyle: 'fa-edit', isActive: false}
      ];
      $compile(element)($rootScope);//第一次编译
      $rootScope.$digest();

      expect(element.hasClass('sidebar-collapsed')).toBe(false);
      //console.log(element.find('#sidebar'));

      $rootScope.menus = model;//重新赋值
      $rootScope.$digest();

      var menus = element.find('.sidebar-menu');//有两个菜单
      expect(menus.length).toEqual(2);
      expect(menus.eq(0).hasClass('active')).toBe(true);

      var spans = element.find('.sidebar-menu span');//
      expect(spans.eq(1).text()).toEqual('任务管理');
      //点击第二个a

      var links = element.find('.sidebar-menu a');//eq(index).find('a').eq(0);
      links.eq(1).click();
      $rootScope.$digest();//第二个进行了点击
      //得到指令
      //modelCtrl = $scope.testForm.testInput;
      menus = element.find('.sidebar-menu');//有两个菜单
      expect(menus.eq(0).hasClass('active')).toBe(false);//第一个菜单为false
      expect(menus.eq(1).hasClass('active')).toBe(true);
      // expect(menus.eq(0).scope().isActive).toBe(false);//第一个自动变成false

      var sidebarCollapse = element.find('#sidebar-collapse');
      expect(sidebarCollapse.length).toEqual(1);
      sidebarCollapse.eq(0).click();
      $rootScope.$digest();

      //console.log('---测试collapsed---');
      expect(element.hasClass('sidebar-collapsed')).toBe(true);//隐藏
      sidebarCollapse.eq(0).click();
      $rootScope.$digest();
      expect(element.hasClass('sidebar-collapsed')).toBe(false);//再次展开

    });
  });

});
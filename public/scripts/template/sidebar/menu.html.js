ngDefine('template/sidebar/menu.html', ['angular'], function (module, angular) {
  'use strict';
  module.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/sidebar/menu.html',
      '<li class = \'sidebar-menu\' ng-class="{\'active\': isActive}">\n' +
        '    <a ng-click="openUrl(sign)">\n' +
        '        <i class="fa {{speicalStyle}}"></i>\n' +
        '        <span>{{menuName}}</span>\n' +
        '    </a>\n' +
        '</li>');
  }]);
});

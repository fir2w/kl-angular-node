angular.module('template/treetable/treetable-item.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/treetable/treetable-item.html',
    '<tr id="{{itemData.id_}}"  class="treegrid-{{itemData.id_}} treegrid-parent-{{itemData.pid_}}" ng-class="{\'folder\':(itemData.is_container_ == \'1\'),\'file\':(itemData.is_container_==\'0\')}">\n' +
    '    <td><span>{{itemData.name_}}</span>\n' +
    '        <button ng-click="addChild(itemData.id_)">+</button>\n' +
    '    </td>\n' +
    '    <td>Folder</td>\n' +
    '    <td>--</td>\n' +
    '</tr>');
}]);

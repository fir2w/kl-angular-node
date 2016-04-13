'use strict';

angular.module('ui.klwork.uiTreetable', ['template/treetable/treetable.html', 'template/treetable/treetable-item.html', 'uuid4'])
  .controller('UiTreetableController', ['$scope', '$element', '$attrs', 'uuid4', function ($scope, element, $attrs, uuid4) {
    this.todolist = [];

    this.addTodo = function (todo) {
      console.log('addTodo:' + angular.toJson(todo));
      this.todolist.push(todo);

      //treetable("node", row.data("ttId")).initialized;
    };

    this.addChild = function (pid, operElement) {
      console.log('addChild' + pid);
      var generate = uuid4.generate();
      var child = {id_: generate, pid_: pid, name_: '为止2'};
      //$scope.todolist.push(child);
//      var parentObj = tools_.ud.find($scope.todolist, function (result) {
//        if (pid == result.id_) {//插入到何时的位置
//          return result;
//        }
//      });
      var parentObj = tools_.queryEntityByKey($scope.todolist,'id_',pid);
      var index = tools_.ud.lastIndexOf($scope.todolist, parentObj);
      $scope.todolist.splice(index + 1, 0, child);
      element.treegrid('render');
    };

  }])
  .directive('uiTreetable', ['$timeout', 'uuid4', function ($timeout, uuid4) {
    return {
      restrict: 'E',
      controller: 'UiTreetableController',
      transclude: true,
      replace: true,
      templateUrl: 'template/treetable/treetable.html',
      link: function (scope, element, attrs) {
        function initFact() {
          var options = scope.$eval(attrs.treeConfig) || {};
          //设置一个默认id
          var elementId = element.id || 'uiTreetableId';
          element.attr('id', elementId);
          //var element = $('#' + options.refId);
          element.treegrid('setTreeContainer', null);

          element.treegrid(options);
          //选中
          element.find('tbody').on("mousedown", "tr", function () {
            $(".selected").not(this).removeClass("selected");
            $(this).toggleClass("selected");
          });

          //拖动
          element.find('.file,.folder').draggable({
            helper: 'clone',
            opacity: .75,
            refreshPositions: true,
            revert: 'invalid',
            revertDuration: 300,
            scroll: true
          });
          //只有folder元素可以接受
          element.find('.folder,.file').each(function () {
            //找到其为tr的父元素，接受通过拖拽放入的组件
            $(this).droppable({

              accept: '.file, .folder',
              drop: function (e, ui) {//放入成功
                var droppedEl = ui.draggable;//拖动的
                var srcId = droppedEl.eq(0).attr('id');
                var destId = $(this).attr('id');
                console.log(droppedEl.eq(0).attr('id') + '--' + $(this).attr('id'));

                var srcObj = tools_.queryEntityByKey(scope.todolist,'id_',srcId);
                //删除原来对象
                var srcOldIndex = tools_.ud.lastIndexOf(scope.todolist, srcObj);
                scope.todolist.splice(srcOldIndex, 1);

                //把修改了pid的对象插入到目的的
                var destObj = tools_.queryEntityByKey(scope.todolist,'id_',destId);
                srcObj.pid_ = destId;
                var destOldIndex = tools_.ud.lastIndexOf(scope.todolist, destObj);
                scope.todolist.splice(destOldIndex+1, 0, srcObj);
                //$(this).data('ttId')为目的节点
                //element.treetable('move', droppedEl.data('ttId'), $(this).data('ttId'));
              },
              hoverClass: 'accept',
              over: function (e, ui) {//可接受的任意draggable到达了当前droppable的上面
                var droppedEl = ui.draggable.parents('tr');//拖动的节点
                if (this != droppedEl[0] && !$(this).is('.expanded')) {//目的，folder节点展开
                 // element.treetable('expandNode', $(this).data('ttId'));
                  $(this).treegrid('expand');
                }
              }
            });
          });
        }

        //更新模型
        var initModel = function (newValue, oldValue) {
          console.log('指令监听执行:' + angular.toJson(newValue) + '----------' + angular.toJson(oldValue));

          setTimeout(function () {
            scope.$apply(function () {
              initFact();
            });
          });
          //$timeout(initFact, 1000);
        };

        //scope.$watch(attrs.treeConfig, initModel, true);
        scope.$watch('todolist', initModel, true);
        //initFact();

      }
    };
  }])
  .directive('uiTreetableItem', function () {
    return {
      require: '^uiTreetable',         // 编译器将搜索包含从当前指令的元素开始的祖先元素
      restrict: 'EA',
      transclude: true,              // It transcludes the contents of the directive into the template
      replace: true,                // The element containing the directive will be replaced with the template
      templateUrl: 'template/treetable/treetable-item.html',
      scope: {
        itemData: '=?'//可选?
      },
      controller: function () {

      },
      link: function (scope, element, attrs, uiTreetableCtl, transclude) {
        /*transclude(scope,function(clone){
         console.log('uiTreetableItem link---------- ' + clone.toString());
         });*/
        //var content = transclude();
        //element.html('');
        scope.addChild = function (parentId) {
          uiTreetableCtl.addChild(parentId, element);
        };
        uiTreetableCtl.addTodo(scope.itemData);
      }
    };
  });
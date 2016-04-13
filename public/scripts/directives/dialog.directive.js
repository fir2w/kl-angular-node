'use strict';

angular.module('ui.klwork.dialog', ['ui.klwork.config', 'ui.klwork.service'])
  .directive('uiDialog', ['$parse', '$compile', 'uiConfig', 'uiLog', 'safeApply', function ($parse, $compile, conf, log, safeApply) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        console.log('dialog link ----------' + scope.$id);
        var opts = scope.$eval(attrs.uiDialog) || {};
        log('Compile dialog2 ui : ');
        log(opts);

        if (!opts.showModel || !opts.dialogId) {
          log('No show model and dialog id given!');
          return;
        }

        // lhgdialog properties
        var props = {};
        if (angular.isObject(conf.dialog2)) {
          angular.extend(props, conf.dialog2);
        }
        props.id = opts.dialogId;
        props.content = el.html();
        props.init = function () {
          // in watch
          $compile($('.ui_content:first'))(scope);
        };
        props.close = function () {
          // use close in dialog toolbar will execute twice
          // use button in dialog user defined will execute once which trigger by watch list
          var getter = $parse(opts.showModel);
          var isShow = getter(scope);
          if (isShow) {
            var setter = getter.assign;
            // trigger watch again
            safeApply(scope, function () {
              setter(scope, false);
            });
          }
        };

        // over write
        if (angular.isDefined(opts.lock))
          props.lock = opts.lock;
        if (angular.isDefined(opts.drag))
          props.drag = opts.drag;
        if (angular.isDefined(opts.fixed))
          props.fixed = opts.fixed;
        if (angular.isDefined(opts.resize))
          props.resize = opts.resize;
        if (opts.width)
          props.width = opts.width;
        if (opts.height)
          props.height = opts.height;
        if (opts.left)
          props.left = opts.left;
        if (opts.top)
          props.top = opts.top;

        scope.$watch(opts.showModel, function (val) {
          // show
          if (val) {
            $.dialog(props);
          } else {
            // hide
            var target = $.dialog.list[opts.dialogId];
            if (target)
              target.close();
          }
        });
      }
    };
  }]);
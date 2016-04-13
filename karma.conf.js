// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/underscore/underscore.js',
      'public/bower_components/bootstrap-css/js/bootstrap.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.core.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.widget.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.mouse.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.draggable.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.droppable.js',
      'public/bower_components/jquery-ui/ui/jquery.ui.sortable.js',
      'public/bower_components/jquery-cookie/jquery.cookie.js',
      'public/bower_components/jquery-flot/jquery.flot.js',
      'public/bower_components/jquery-flot/jquery.flot.resize.js',
      'public/bower_components/jquery-flot/jquery.flot.pie.js',
      'public/bower_components/jquery-flot/jquery.flot.stack.js',
      'public/bower_components/jquery-flot/jquery.flot.crosshair.js',
      'public/bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
      'public/bower_components/jquery.slimscroll/jquery.slimscroll.js',
      'public/bower_components/jquery-treetable/javascripts/src/jquery.treetable.js',
      'public/scripts/lib/jquery.sparkline.min.js',
      'public/scripts/lib/lhgdialog.min.js',
      'public/scripts/lib/jquery.mjs.nestedSortable.js',
      'public/scripts/lib/tools.lib.js',
      'public/scripts/lib/mocks.lib.js',
      'public/third-lib/taffy.js',
      'public/third-lib/async.js',
      'public/third-lib/My97DatePicker/WdatePicker.js',
      'public/third-lib/date-zh-CN.js',
      'public/third-lib/ui-layout/ui-layout.js',
      'public/third-lib/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-cookies/angular-cookies.js',
      'public/bower_components/angular-sanitize/angular-sanitize.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-animate/angular-animate.js',
      'public/bower_components/angular-uuid4/angular-uuid4.js',
      'public/bower_components/fullcalendar/fullcalendar.js',
      'public/bower_components/fullcalendar/gcal.js',
      'public/bower_components/angular-ui-calendar/src/calendar.js',
      'public/scripts/template/sidebar/sidebar.html.js',
      'public/scripts/template/treetable/treetable.html.js',
      'public/scripts/template/treetable/treetable-item.html.js',
      'public/scripts/template/sidebar/menu.html.js',
      'public/scripts/template/sidebar/sidebar-collapse.html.js',
      'public/scripts/template/wdatepicker/wdatepicker.html.js',
      'public/scripts/app.js',
      'public/scripts/directives/yaTree.js',
      'public/scripts/directives/uiNestedSortable.js',
      'public/scripts/services/socket.service.js',
      'public/scripts/services/ui.klwork.config.js',
      'public/scripts/services/ui.klwork.service.js',
      'public/scripts/services/userManager.service.js',
      'public/scripts/services/uiManager.service.js',
      'public/scripts/services/dataMockManager.service.js',
      'public/scripts/directives/wigets.directive.js',
      'public/scripts/directives/sidebar.directive.js',
      'public/scripts/directives/wDatePicker.directive.js',
      'public/scripts/directives/dialog.directive.js',
      'public/scripts/directives/uiTreetable.directive.js',
      'public/scripts/filters/ui.klwork.filter.js',
      'public/scripts/controllers/main.controller.js',
      'public/scripts/controllers/navbar.controller.js',
      'public/scripts/controllers/dashboard.controller.js',
      'public/scripts/controllers/hallMain.controller.js',
      'public/scripts/controllers/profile.controller.js',
      'public/scripts/controllers/im.controller.js',
      'public/scripts/controllers/team/myTeams.controller.js',
      'public/scripts/controllers/myroute.js',
      'public/scripts/controllers/calendar.controller.js',
      'public/scripts/controllers/login.controller.js',
      'public/scripts/controllers/team/teamMain.controller.js',
      'public/scripts/controllers/team/myPeoples.controller.js',
      'public/scripts/controllers/task/taskMain.controller.js',
      'public/scripts/controllers/task/inboxTask.controller.js',
      'public/scripts/controllers/project.js',
      'public/scripts/controllers/social.js',
      'public/scripts/controllers/crowdsourcing.js',
      'public/scripts/controllers/tasks.js',
      'public/scripts/filters/interpolate.js',
      'public/scripts/services/kanbanServices.js',
      'public/scripts/controllers/kanban.js',
      'test/client/spec/directives/uiTreetable.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8050,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};

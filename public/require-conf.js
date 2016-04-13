/**
 * @namespace angular
 * @description Angular.js {@link http://docs.angularjs.org/api|documentation won't help much}
 */

/**
 * @name Module
 * @memberof angular
 * @description {@link http://docs.angularjs.org/api/angular.Module|The angular.js Module class}
 */

/**
 * @name Service
 * @memberof angular
 * @description No idea what angular.js Services **really** are?
 * Me neither, update welcome.
 */

/**
 * @namespace cam
 */

/**
 * @namespace cam.common
 */
(function (factory) {
  'use strict';
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  }
  else {
    define([], factory);
  }
}(function () {
  'use strict';
  /**
   * A UMD module that provides some configuration for
   * {@link http://requirejs.org/docs/api.html#config|require.js}.
   *
   * @exports require-conf
   *
   * @example
   *    require(['../../require-conf'], function(rjsConf) {
   *
   *      // configure require.js...
   *      require(rjsConf);
   *
   *      // ...start loading dependencies...
   *      require([
   *        'backbone',
   *        'whatever'
   *      ], function(Backbone, Whatever) {
   *        // ...to do something
   *      });
   *    });
   */
  var conf = {};

  /**
   * The base path/URL used by require.js to build the URL
   * of the different modules to be loaded.
   * {@link http://requirejs.org/docs/api.html#config-baseUrl|See the require.js docs for **baseUrl** configuration}
   * @type {string}
   */
  conf.baseUrl = './';

  /**
   * Arguments (query string) used by require.js to build the URL
   * of the different modules to be loaded.
   * This property is used to prevent browsers to keep outdated versions of a file.
   * {@link http://requirejs.org/docs/api.html#config-urlArgs|See the require.js docs for **urlArgs** configuration}
   * @type {string}
   */
  conf.urlArgs = ''/* cache-busting +'bust=' + CACHE_BUSTER /* */;

  /**
   * Keys are module names and values are paths or URLs.
   * {@link http://requirejs.org/docs/api.html#config-paths|See the require.js docs for **paths** configuration}
   * @type {Object.<string, string>}
   */
  conf.paths = {
    'ngDefine': 'bower_components/requirejs-angular-define/src/ngDefine',
    'ngParse': 'bower_components/requirejs-angular-define/src/ngParse',
    'domReady': 'bower_components/requirejs-domready/domReady',
    'underscore': 'bower_components/underscore/underscore',
    'jquery': 'bower_components/jquery/dist/jquery',
    'jquery-slimscroll': 'bower_components/jquery.slimscroll/jquery.slimscroll',
    'jquery.ui.core': 'bower_components/jquery-ui/ui/jquery.ui.core',
    'jquery.ui.widget': 'bower_components/jquery-ui/ui/jquery.ui.widget',
    'jquery.ui.draggable': 'bower_components/jquery-ui/ui/jquery.ui.draggable',
    'jquery.ui.droppable': 'bower_components/jquery-ui/ui/jquery.ui.droppable',
    'jquery.ui.sortable': 'bower_components/jquery-ui/ui/jquery.ui.sortable',
    'jquery.cookie': 'bower_components/jquery-cookie/jquery.cookie',
    'bootstrap': 'bower_components/bootstrap-css/js/bootstrap',
    'angular': 'bower_components/angular/angular',
    'angular-uuid4': 'bower_components/angular-uuid4/angular-uuid4',
    'angular-resource': 'bower_components/angular-resource/angular-resource',
    'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
    'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
    'angular-route': 'bower_components/angular-route/angular-route',
    'angular-animate': 'bower_components/angular-animate/angular-animate',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-ui-calendar': 'bower_components/angular-ui-calendar/src/calendar',
    'moment': 'bower_components/momentjs/moment',
    'moment_zh': 'bower_components/momentjs/lang/zh-cn',
    'pikaday': 'third-lib/pikaday/pikaday',
    'angular-pikaday': 'third-lib/pikaday/angular-pikaday',
    'klwork.tools': 'scripts/lib/tools.lib',
    'klwork.mocks': 'scripts/lib/mocks.lib',
    'taffy': 'third-lib/taffy',
    'async': 'third-lib/async',
    'jquery.pnotify': 'third-lib/pnotify/jquery.pnotify',
    'angular-pines-notify': 'third-lib/pnotify/pnotify',
    'myDatePicker': 'third-lib/My97DatePicker/WdatePicker',
    'myDate': 'third-lib/date-zh-CN',
    'prettydate-cn': 'third-lib/prettydate/jquery.prettydate-cn',
    'myUiLayout': 'third-lib/ui-layout/ui-layout',
    'jquery.treegrid': 'third-lib/treetable/jquery.treegrid',
    'angular-ui': 'third-lib/angular-bootstrap/ui-bootstrap-tpls'
  };

  /**
   * Keys are module names and values are information on how to shim the modules.
   * {@link http://requirejs.org/docs/api.html#config-shim|See the require.js docs for **shim** configuration}
   * @type {Object.<string, (Object|array)>}
   */
  conf.shim = {
    'underscore': {
      exports: 'underscore'
    },
    'async': {
      exports: 'async'
    },
    'klwork.tools': {
      deps: ['jquery','underscore']
    },
    'jquery-slimscroll':{
      deps: ['jquery']
    },
    'moment': {
      exports: 'moment'
    },
    'moment_zh': {
      deps: ['moment']
    },
    'jquery.ui.core': ['jquery'],
    'jquery.ui.widget': ['jquery'],
    'jquery.ui.draggable': ['jquery'],
    'jquery.ui.droppable': ['jquery'],
    'jquery.ui.sortable': ['jquery'],
    'jquery.cookie': ['jquery'],
    'jquery.treegrid': ['jquery'],
    'bootstrap': ['jquery'],
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    },
    'angular-resource': ['angular'],
    'angular-cookies': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-route': ['angular'],
    'angular-animate': ['angular'],
    'angular-mocks': ['angular'],
    'angular-ui-calendar': ['angular'],
    'angular-ui': ['angular'],
    'angular-pines-notify': {
      deps: ['angular','jquery.pnotify']
    },
    'pikaday': {
      deps: ['moment_zh']
    },
    'angular-pikaday': {
      deps: ['angular','pikaday']
    }
  };

  /**
   * For CommonJS modules (following the CommonJS scaffolding guid lines).
   * {@link http://requirejs.org/docs/api.html#config-packages|See the require.js docs for **packages** configuration}
   * @type {Object.<string, Object>}
   */
  conf.packages = [

  ];


  /**
   * A set of utilities to bootstrap applications
   */
  conf.utils = {};

  /**
   * Utility to ensure compatibility of test scenarios loaded with require.js
   * {@link http://stackoverflow.com/questions/15499997/how-to-use-angular-scenario-with-requirejs}
   *
   * @param {string} appName - The "angular app name"
   */
  conf.utils.ensureScenarioCompatibility = function (appName) {
    var html = document.getElementsByTagName('html')[0];

    html.setAttribute('ng-app', appName);
    if (html.dataset) {
      html.dataset.ngApp = appName;
    }

    if (top !== window) {
      window.parent.postMessage({ type: 'loadamd' }, '*');
    }
  };

  /**
   * Utility function to bootsrap angular applications
   *
   * @param angular {Object} - angular, obviously
   * @param appName {string} - the package name of the application
   */
  conf.utils.bootAngular = function (angular, appName) {
    angular.bootstrap(document, [ appName ]);

    conf.utils.ensureScenarioCompatibility(appName);
  };

  /* live-reload
   // loads livereload client library (without breaking other scripts execution)
   require(['jquery'], function($) {
   $('body').append('<script src="//localhost:LIVERELOAD_PORT/livereload.js?snipver=1"></script>');
   });
   /* */

  return conf;
}));

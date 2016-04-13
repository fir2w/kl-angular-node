(function(document, window, require) {
  'use strict';

  var baseUrl = './';
  var APP_NAME = 'klwork';
  var pluginPackages = window.PLUGIN_PACKAGES || [];

  require([baseUrl +'require-conf.js'], function(rjsConf) {
    require({
      baseUrl:    baseUrl,
      urlArgs:    rjsConf.urlArgs,
      paths:      rjsConf.paths,
      shim:       rjsConf.shim,
      packages:   rjsConf.packages.concat(pluginPackages)
    });

    require([
      'angular',
      'angular-resource',
      'angular-sanitize',
      'ngDefine'
    ], function(angular) {

      require([
        'scripts/app',
        'domReady!'
      ], function() {
        rjsConf.utils.bootAngular(angular, APP_NAME);
      });
    });
  });

})(document, window || this, require);

'use strict';

var conf = {};
conf.date = {dateFormat: 'yy-mm-dd'};
conf.autocomplete = {minChars: 3, maxItemsToShow: 20};

var md = angular.module('ui.klwork.config', []);
md.value('uiConfig', conf);
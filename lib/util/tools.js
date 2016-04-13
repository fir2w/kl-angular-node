/**
 * Created by ww on 14-3-17.
 */
'use strict';

var util = require('util')
  , lodash = require('lodash')
  , _string = require('underscore.string')
  , uuid = require('node-uuid');

var Tools = module.exports = {
  _: (function () {
    var _ = lodash
      , _s = _string;

    _.mixin(_s.exports());
    _.mixin({
      includes: _s.include,
      camelizeIf: function (string, condition) {
        var result = string;

        if (condition) {
          result = _.camelize(string);
        }

        return result;
      },
      underscoredIf: function (string, condition) {
        var result = string;

        if (condition) {
          result = _.underscored(string);
        }

        return result;
      },
      /*
       * Returns an array with some falsy values removed. The values null, "", undefined and NaN are considered falsey.
       */
      compactLite: function (array) {
        var index = -1,
          length = array ? array.length : 0,
          result = [];

        while (++index < length) {
          var value = array[index];
          if (typeof value === 'boolean' || value === 0 || value) {
            result.push(value);
          }
        }
        return result;
      }
    });

    return _;
  })(),

  tick: function (func) {
    var tick = (global.hasOwnProperty('setImmediate') ? global.setImmediate : process.nextTick);
    tick(func);
  },
  addEventEmitter: function (_class) {
    util.inherits(_class, require('events').EventEmitter);
  },


  copyValue: function (dest, source, ex) {
    var filters = {};
    if (ex != null) {
      filters = ex;
    }
    for (var prop in dest) {
      if (source.hasOwnProperty(prop) && !filters.prop) {
        dest[prop] = source[prop];
      }
    }
  },

  copySpecialValue: function (dest, source, special) {
    for (var i in special) {
      var prop = special[i];
      if (source[prop]) {
        dest[prop] = source[prop];
      }
    }
  },
  getUUID: function () {
    return uuid.v1();
  },

  getSuccessObj: function (data, dataType) {
    var obj = {};
    obj.ret = '0';
    obj.data = data;
    obj.data_type = dataType ? dataType : '0';//默认为0
    return obj;
  },

  getErrorObj: function (error, errorCode) {
    var obj = {};
    obj.ret = '-1';
    obj.error = error;
    obj.error_code = errorCode ? errorCode : '0';//默认为0
    return obj;
  },

  jsonData: function (res,obj) {
    console.log('jsonData:' + JSON.stringify(obj));
    res.json(this.getSuccessObj(obj));
  },
  jsonErr: function (res,error) {
    throw error;
    //res.json(this.getErrorObj(error));
  },
  //将数组中的元素加上'
  arrayToSqlJoin: function(temList) {
    temList.push('-1');
    return temList.map(function(v){
      return '\'' + v + '\'';
    });
  }
};

Tools.CustomEventEmitter = require('../../lib/emitters/custom-event-emitter');

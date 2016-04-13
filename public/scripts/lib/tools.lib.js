//define('klwork.tools',['underscore'], function () {
  'use strict';

  var tools_ = {
    ud: _,
    regexpUrl: function (regexp) {//url正则表达式函数
      return {
        test: function (url) {
          this.matches = url.match(regexp);
          return this.matches && this.matches.length > 0;
        }
      };
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

    resDataValid: function (result) {
      if (result != null && result.ret === '0') {
        return true;
      }
      return false;
    },

    difference: function (array, rest, recall) {
      //var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
      return this.ud.filter(array, function (value) {
        return !tools_.contains(rest, value, recall);
      });
    },

    // recall containValue, componeValue
    contains: function (obj, target, recall) {
      if (obj == null) return false;
      // if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
      var defaultCalll = function (value) {
        return value === target;
      };
      var cusRecall = function (value) {
        if (recall) {
          return recall.call(null, value, target);
        } else {
          return value === target;
        }
      }

      return this.ud.any(obj, cusRecall);
    },

    containsById: function containObj(lists, incData) {
      var IdcompareFun = function (value, target) {
        return value.id_ === target.id_;
      };
      var ret = tools_.contains(lists, incData, IdcompareFun);
      return ret;
    },
    queryEntityByKey: function (lists, keyName, keyValue) {
      var ret = tools_.ud.find(lists, function (entity) {
        if (keyValue == entity[keyName]) {//插入到何时的位置
          return entity;
        }
      });
      return ret;
    }
  };
//});




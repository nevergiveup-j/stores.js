'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.deepAsset = deepAsset;
exports.timeNow = timeNow;
/**
 * 是否对象
 * @param {Object} data 数据
 * @return {Boolean}
 */
function isObject(data) {
  return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object';
}

/**
 * 深断言
 * @param {Object} a 数据1
 * @param {Object} b 数据2
 * @return {Boolean}
 */
function deepAsset(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * 解析时间戳
 * @return {Number}
 */
function timeNow() {
  return +new Date();
}

/**
 * 是否值相等
 * @param {object} data1 数据1
 * @param {object} data2 数据2
 */
var isEqual = exports.isEqual = function isEqual(x, y) {
  if (!(x instanceof Object) || !(y instanceof Object)) return false;

  var keysX = Object.keys(x);
  var keysY = Object.keys(y);

  // 长度不相等
  if (keysX.length !== keysY.length) return false;

  for (var i = 0; i < keysX.length; i += 1) {
    var propName = keysX[i];

    // value等于object、function
    if (_typeof(x[propName]) === 'object' || typeof x[propName] === 'function') {
      if (!deepAsset(x[propName], y[propName])) {
        return false;
      }
    } else if (x[propName] !== y[propName]) {
      return false;
    }
  }

  return true;
};
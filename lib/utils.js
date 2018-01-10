'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.deepAsset = deepAsset;
exports.timeNow = timeNow;
exports.isEqual = isEqual;
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
 * 数据相同
 * @param {Object} a 数据1
 * @param {Object} b 数据2
 * @return {Boolean}
 */
function isEqual(a, b) {
  if (isObject(a) && isObject(b)) {
    return deepAsset(a, b);
  }
  return false;
}
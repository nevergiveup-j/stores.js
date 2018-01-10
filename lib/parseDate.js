'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timestamp = {
  Y: 31536000000,
  M: 2592000000,
  d: 86400000,
  h: 3600000,
  m: 60000,
  s: 1000
};

/**
 * 解析时间戳
 * @param {Array} value 时间
 * @return {Number}
 * examples parseTimestamp(['1m'])
 */
var parseTimestamp = function parseTimestamp(value) {
  var re = /[a-zA-Z]$/;
  var pos = value.search(re);

  if (!pos) {
    return 0;
  }

  var sStart = +value.replace(re, '');
  var sEnd = value.slice(pos);

  return sStart > 0 ? sStart * timestamp[sEnd] : 0;
};

var reDate = /^(\d+[YMdhms])+$/;
var reMatchDate = /\d+[YMdhms]/g;

/**
 * 解析时间
 * @param {String} value 时间
 * @return {Number}
 * examples parseDate('2d1h')
 */
var parseDate = function parseDate(value) {
  var total = 0;

  if (reDate.test(value)) {
    var dates = value.match(reMatchDate);

    if (dates.length) {
      dates.map(function (d) {
        total += parseTimestamp(d);
        return total;
      });

      return total;
    }
  }

  return total;
};

exports.default = parseDate;
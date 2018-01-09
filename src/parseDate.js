const timestamp = {
  Y: 31536000000,
  M: 2592000000,
  d: 86400000,
  h: 3600000,
  m: 60000,
  s: 1000,
};

/**
 * 解析时间戳
 * @param {Array} value 时间
 * @return {Number}
 * examples parseTimestamp(['1m'])
 */
const parseTimestamp = (value) => {
  const re = /[a-zA-Z]$/;
  const pos = value.search(re);

  if (!pos) {
    return 0;
  }

  const sStart = +value.replace(re, '');
  const sEnd = value.slice(pos);

  return sStart > 0 ? (sStart * timestamp[sEnd]) : 0;
};

const reDate = /^(\d+[YMdhms])+$/;
const reMatchDate = /\d+[YMdhms]/g;

/**
 * 解析时间
 * @param {String} value 时间
 * @return {Number}
 * examples parseDate('2d1h')
 */
const parseDate = (value) => {
  if (reDate.test(value)) {
    const dates = value.match(reMatchDate);
    if (dates.length) {
      return dates.map(d => parseTimestamp(d));
    }

    // console.log('dates==', dates);
  }

  return 0;
};

export default parseDate;

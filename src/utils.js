/**
 * 是否对象
 * @param {Object} data 数据
 * @return {Boolean}
 */
export function isObject(data) {
  return typeof data === 'object';
}
 
/**
 * 深断言
 * @param {Object} a 数据1
 * @param {Object} b 数据2
 * @return {Boolean}
 */
export function deepAsset(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * 解析时间戳
 * @return {Number} 
 */
export function timeNow() {
  return +new Date;
}

/**
 * 数据相同
 * @param {Object} a 数据1
 * @param {Object} b 数据2
 * @return {Boolean}
 */
export function isEqual(a, b) {
  if(isObject(a) && isObject(b)) {
    return deepAsset(a, b)
  }
  return false;
}
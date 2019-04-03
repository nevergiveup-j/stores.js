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
  return +new Date();
}

/**
 * 是否值相等
 * @param {object} data1 数据1
 * @param {object} data2 数据2
 */
export const isEqual = (x, y) => {
  if (!(x instanceof Object) || !(y instanceof Object)) return false;

  const keysX = Object.keys(x);
  const keysY = Object.keys(y);

  // 长度不相等
  if (keysX.length !== keysY.length) return false;

  for (let i = 0; i < keysX.length; i += 1) {
    const propName = keysX[i];

    // value等于object、function
    if (typeof x[propName] === 'object' || typeof x[propName] === 'function') {
      if (!deepAsset(x[propName], y[propName])) {
        return false;
      }
    } else if (x[propName] !== y[propName]) {
      return false;
    }
  }

  return true;
};

import parseDate from './parseDate';
import * as utils from './utils';

const isSupported = !!window.localStorage;
const cacheStore = {};

/**
 * @class Store
 * 存储层，将单页数据保存于localStorage中
 */
class Store {
  constructor(name, expire = '7d') {
    this.name = name;
    this.expire = parseDate(expire);
    this.store = isSupported ? window.localStorage : cacheStore;
  }
  /**
   * 获取数据
   * @params {Object}  参数数据
   * @return {Boolean} 返回数据
   */
  has(params = {}) {
    let data = this.store[this.name];

    // 解析data
    if(data && data.length){
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = {};
      }
    }

    if (data && data.expire) {
      if (utils.timeNow() < data.expire && utils.isEqual(params, data.params)) {
        return true;
      }
    }

    return false;
  }
  /**
   * 获取数据
   * @return {Object}  返回数据
   * {
   *    expire: 14000002000, //过期毫秒数
   *    value:  [data]       //本地存储的数据
   * }
   */
  get() {
    let data = this.store[this.name] || '{}';
    data = JSON.parse(data);

    if (!data.expire || utils.timeNow() >= data.expire) {
      return {};
    }

    return data.value;
  }
  /**
   * 设置存储
   * @param {Object|Array|String|Number} value 值
   * @param {Object} params 参数
   */
  set(value, params = {}) {
    if (this.expire === 0) return false;
    const data = {
      expire: (utils.timeNow() + this.expire),
      value,
      params,
    };

    this.store[this.name] = JSON.stringify(data);

    return true;
  }
  // 删除数据
  delete() {
    delete this.store[this.name];
  }
}

export default Store;

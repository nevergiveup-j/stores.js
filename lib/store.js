'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseDate = require('./parseDate');

var _parseDate2 = _interopRequireDefault(_parseDate);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cacheStore = {};

/**
 * @class Store
 * 存储层，将单页数据保存于localStorage中
 * @param {String} name      名字
 * @param {String} expire    设置失效时间
 * @param {Object} options   参数配置
 * @config {String} prefix    前缀名字
 * @config {String} type 类型 localStorage|sessionStorage
 */

var Store = function () {
  function Store(name) {
    var expire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '7d';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Store);

    this.opts = _extends({
      prefix: 'NG_',
      type: 'localStorage'
    }, options);

    this.prefix = this.opts.prefix;
    this.name = this.prefix + '_' + name;
    this.expire = (0, _parseDate2.default)(expire);

    var isSupported = !!window['' + this.opts.type];

    this.store = isSupported ? window['' + this.opts.type] : cacheStore;

    // 清除失效时间
    this.clearExpireTime();
  }
  /**
   * 判断数据是否失效
   * @params {Object}  参数数据
   * @return {Boolean} 返回数据
   */


  _createClass(Store, [{
    key: 'has',
    value: function has() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var data = this.store[this.name];

      // 解析data
      if (data && data.length) {
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

  }, {
    key: 'get',
    value: function get() {
      var data = this.store[this.name] || '{}';
      data = JSON.parse(data);

      if (!data.expire || utils.timeNow() >= data.expire) {
        return '';
      }

      return data.value;
    }
    /**
     * 设置存储
     * @param {Object|Array|String|Number} value 值
     * @param {Object} params 参数
     */

  }, {
    key: 'set',
    value: function set(value) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.expire === 0) return false;
      var data = {
        expire: utils.timeNow() + this.expire,
        value: value,
        params: params
      };

      try {
        this.store[this.name] = JSON.stringify(data);
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.error('超出本地存储限额！');
          this.clearAll();
          this.store[this.name] = JSON.stringify(data);
        }
      }

      return true;
    }
    // 删除数据

  }, {
    key: 'delete',
    value: function _delete() {
      delete this.store[this.name];
    }
    // 清除失效时间

  }, {
    key: 'clearExpireTime',
    value: function clearExpireTime() {
      var _this = this;

      var re = new RegExp('^' + this.prefix);
      Object.keys(this.store).map(function (key) {
        try {
          if (re.test(key)) {
            var data = JSON.parse(_this.store[key]);

            if (utils.isObject(data)) {
              if (data.expire && utils.timeNow() >= data.expire) {
                delete _this.store[key];
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
        return key;
      });
    }
    // 清除当前store数据

  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      var re = new RegExp('' + this.prefix);

      Object.keys(this.store).map(function (key) {
        if (re.test(key)) {
          delete _this2.store[key];
        }
        return key;
      });
    }
    // 清除全部store

  }, {
    key: 'clearAll',
    value: function clearAll() {
      var _this3 = this;

      Object.keys(this.store).map(function (key) {
        delete _this3.store[key];
        return key;
      });
    }
  }]);

  return Store;
}();

exports.default = Store;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseDate = require('./parseDate');

var _parseDate2 = _interopRequireDefault(_parseDate);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isSupported = !!window.localStorage;
var cacheStore = {};

/**
 * @class Store
 * 存储层，将单页数据保存于localStorage中
 */

var Store = function () {
  function Store(name) {
    var expire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '7d';

    _classCallCheck(this, Store);

    this.name = name;
    this.expire = (0, _parseDate2.default)(expire);
    this.store = isSupported ? window.localStorage : cacheStore;
  }
  /**
   * 获取数据
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
        return {};
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

      this.store[this.name] = JSON.stringify(data);

      return true;
    }
    // 删除数据

  }, {
    key: 'delete',
    value: function _delete() {
      delete this.store[this.name];
    }
  }]);

  return Store;
}();

exports.default = Store;
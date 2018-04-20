# 本地数据存取，由于localStorage没有失效时间。使用stores.js会处理失效时间
[![Build Status](https://travis-ci.org/nevergiveup-j/stores.js.svg?branch=master)](https://travis-ci.org/nevergiveup-j/stores.js)
[![Coverage Status](https://coveralls.io/repos/github/nevergiveup-j/storage/badge.svg?branch=master)](https://coveralls.io/github/nevergiveup-j/storage?branch=master)
[![npm package](https://img.shields.io/npm/v/stores.js.svg)](https://www.npmjs.com/package/stores.js)
[![NPM downloads](https://img.shields.io/npm/dm/stores.js.svg)](https://www.npmjs.com/package/stores.js) 

## Install
```
npm install stores.js --save
```

## Usage
```
import Store from 'stores.js';

const store = new Store('test', '1Y1m', {
  prefix: 'NG_',
  type: 'localStorage',
});

// 设置值
store.set({ name: 'store name' });

// 获取test值
store.get();
```

## API
### new Store 参数配置

| 参数        | 说明                         |  类型   | 默认值  |
| --------   | ---------------------------- | ------ | --------------- |
| name       | 存取名字                                       | string  |                |
| expire     | 失效时间	 年/月/日/小时/分/秒  1Y/1M/1d/1h/2m/1s | string  | 默认失效时间为7天 |
| options    | 参数配置                     | object  |  |

options 参数配置
| 参数        | 说明                         |  类型   | 默认值    |
| --------   | ---------------------------- | ------ | --------------- |
| prefix     | 前缀名字，为了清除localStorage失效数据     | string  |                |
| type       | 存取分别为localStorage|sessionStorage   | string  | 默认localStorage |


### 创建`const store = new Store('test')`实例，`store`提供的 API 如下

| 参数        | 说明                         |  类型    | return   | 调用方式  |
| --------   | ---------------------------- | ------- | -------- | ------- |
| has        | 判断本地存储的数据是否失效       |         | boolean  | store.has({ id: 1 })   |
| get        | 获取本地存储的数据              |         |  data    | store.get() |
| set        | 设置本地数据      | Object|Array|String|Number | boolean | store.set('date test===',{}) |
| delete     | 删除本地数据                   |         | boolean  | store.delete() |
| clear      | 清除前缀`prefix`本地数据        |         |          | store.clear() |
| clearAll   | 清除全部本地数据                |         |          | store.clearAll() |

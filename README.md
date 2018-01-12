# store 

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
import React, { Component } from 'react';

import Store from 'stores.js';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    const store = new Store('test1', '1Y1m');
    // const store1 = new Store('test2', '1h1m');

    store.set({ name: 'store name' });
    // store1.set({ name: 'store name' });

    store.delete();

    console.log('store===', store);
    console.log('get===', store.get());
  }
  render() {
    return (
      <div className="form-wrap">
        1111111<br />
        2222222
      </div>
    );
  }
}

export default App;
```

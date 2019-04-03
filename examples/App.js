import React, { Component } from 'react';

import Store from '../src/index';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    const store = new Store('test', '1Y1m', {
      prefix: 'NG_',
      type: 'localStorage',
    });

    store.set({ name: 'store name' }, {
      test: '1',
      a: '2',
    });

    // store.delete();

    // store.clearAll();

    console.log('store===', store.store);
    console.log('get===', store.get({
      a: '2',
      test: '1',
    }));
    console.log('get===', store.has());
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

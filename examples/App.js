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
    const store = new Store('test1', '1Y1m');
    // const store1 = new Store('test2', '1h1m');

    store.set({ name: 'store name' });
    // store1.set({ name: 'store name' });

    // store.delete();

    // store.clearAll();

    console.log('store===', store.store);
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

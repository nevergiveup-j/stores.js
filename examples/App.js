import React, { Component } from 'react';

import Store from '../src/index'

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    const store = new Store('sto', '1m');
    const store1 = new Store('sto1', '1m');

    store.set({ name: 'store name' });

    console.log('store===', store.get());
    console.log('has===', store.has());
    console.log('get===', store1.get());
	}
  render() {
    return (
      <div className="form-wrap">
        1111111<br />
        2222222
      </div>
    )
  }
}

export default App;

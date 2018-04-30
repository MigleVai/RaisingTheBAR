import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import Admin from './components/Admin/Admin';
import User from './components/User/User'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/admin" component={Admin} />
        <Route exact path="/" render={() => (
          <Redirect to="/shop" />
        )} />
        <Route path="/shop" component={User} />
      </div>
    );
  }
}

export default App;

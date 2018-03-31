import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import ImgCarousel from './components/ImgCarousel';
import SignIn from './components/LoginSignup/SignIn';
import Register from './components/LoginSignup/Register';
import ItemList from './components/ItemList';
import UserShoppingCart from './components/UserShoppingCart';
import Payment from './components/Payment'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  }

  handleLogging(logged) {
    this.setState({
      logged: logged
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <Route path="/" render={(props) => <Header onLogging={this.handleLogging.bind(this)}
            logged={this.state.logged} />} />
        </header>
        <Route exact path="/" component={ImgCarousel} /> 
        <Route path="/signin" render={(props) => <SignIn onLogging={this.handleLogging.bind(this)} />} />
        <Route path="/register" render={(props) => <Register onLogging={this.handleLogging.bind(this)} />} />
        <Route path="/allitems" component={ItemList} />
        <Route path="/cart" component={UserShoppingCart} />
        <Route path="/payment" {...this.props} render={(props) => (
          !this.state.logged ? <Redirect to="/signin" /> : <Payment {...this.props} {...props} />)} />
      </div>
    );
  }
}

export default App;

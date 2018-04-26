import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/NavBar/Header';
import ImgCarousel from './components/ImgCarousel';
import SignIn from './components/LoginSignup/SignIn';
import Register from './components/LoginSignup/Register';
import UserShoppingCart from './components/Cart/UserShoppingCart';
import Payment from './components/Payment';
import ItemPage from './components/ItemPage';
import Item from './components/Item';
import axios from 'axios';
import OrderHistory from './components/OrderHistory';
import Settings from './components/SettingsInfo/Settings';
import Admin from './components/Admin/Admin';
import OrderStepper from './components/OrderStepper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        logged: false,
        productAmount: 0,
      };

    this.handleLogging = this.handleLogging.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('jwtToken')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      this.setState({ logged: true });
      axios.get(`/api/Cart/GetProductAmountInCart`)
        .then(res => {
          this.setState({ productAmount: res.data });
        });
    }
    if (localStorage.getItem('productAmount')) {
      this.setState({ productAmount: localStorage.getItem('productAmount') });
    }
  }
  handleAmount(settableAmount) {
    this.setState({ productAmount: settableAmount });
  }

  handleLogging = (logged) => { this.setState({ logged: logged }) }

  render() {
    return (
      <div className="App">
        <Route path="/admin" render={(props) => <Admin islogged={this.state.logged} {...props} />} />
        <header>
          <Route path="/" render={(props) => <Header productAmount={this.state.productAmount} {...props} handleLogging={this.handleLogging} islogged={this.state.logged} />} />
        </header>
        <Route exact path="/" component={ImgCarousel} />
        <Route path="/signin" render={(props) => <SignIn handleAmount={this.handleAmount} {...props} handleLogging={this.handleLogging} />} />
        <Route path="/register" render={(props) => <Register handleAmount={this.handleAmount} {...props} handleLogging={this.handleLogging} />} />
        <Route exact path="/products" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/products/:category/:productId" render={(props) => <Item handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route exact path="/products/:category" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route exact path="/products" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/cart" render={(props) => <UserShoppingCart productAmount={this.state.productAmount} handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/orders" component={OrderHistory} />
        <Route path="/settings" component={Settings} />
        <Route path="/stepper" component={OrderStepper} />
        <Route path="/payment" render={(props) => (
          !this.state.logged ? <Redirect to="/signin" /> : <Payment />)} />

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

import Header from './NavBar/Header';
import ImgCarousel from './ImgCarousel';
import SignIn from './LoginSignup/SignIn';
import Register from './LoginSignup/Register';
import Payment from './OrderStepper/Payment';
import ItemPage from './Items/ItemPage';
import Item from './Items/Item';
import OrderStepper from './OrderStepper/OrderStepper';
import axios from 'axios';
import OrderHistory from './OrderHistory/OrderHistory';
import Settings from './SettingsInfo/Settings';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        logged: false,
        productAmount: 0,
        open: false
      };

    this.handleLogging = this.handleLogging.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.checkError = this.checkError.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkErrorOnTheGo = this.checkErrorOnTheGo.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('jwtToken') && (localStorage.getItem('role') === 'user')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      this.setState({ logged: true });
      axios.get(`/api/Cart/GetProductAmountInCart`)
        .then(res => {
          this.setState({ productAmount: res.data });
        })
        .catch(error => {
          if (error.response !== undefined && error.response.status === 401) {
            this.setState({ open: true });
          }
        });
    }

    if (localStorage.getItem('productAmount')) {
      this.setState({ productAmount: localStorage.getItem('productAmount') });
    }
  }

  handleAmount(settableAmount) {
    this.setState({ productAmount: settableAmount });
  }

  handleLogging = (logged) => {
    if (logged === false) {
      this.setState({ productAmount: 0 });
    }
    this.setState({ logged: logged });
  }

  handleClose = () => {
    this.setState({ open: false, logged: false });
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    localStorage.removeItem('amount');
  };

  checkErrorOnTheGo() {
    axios.interceptors.response.use(undefined, function (error) {
      if (error.response.status === 401) {
        this.setState({ open: true });
      }
    });
  }
  checkError() {
    if (this.state.open) {
      const actions = [
        <Link to={"/shop/signin"}><FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        /></Link>,
      ];
      return (
        <div>
          <Dialog
            title="Notification"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Your session has ended! 
            <br/>
            Please re-login.
        </Dialog>
        </div>
      );
    }
  }
  render() {
   // this.checkErrorOnTheGo();
    //cart 62 eilute
    return (
      <div className="App">
        <header>
          <Route path="/shop" render={(props) => <Header productAmount={this.state.productAmount} {...props} handleLogging={this.handleLogging} islogged={this.state.logged} />} />
        </header>
        <Route exact path="/shop" component={ImgCarousel} />
        <Route path="/shop/signin" render={(props) => <SignIn handleAmount={this.handleAmount} {...props} handleLogging={this.handleLogging} />} />
        <Route path="/shop/register" render={(props) => <Register handleAmount={this.handleAmount} {...props} handleLogging={this.handleLogging} />} />
        <Route exact path="/shop/products" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/shop/products/:category/:productId" render={(props) => <Item handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route exact path="/shop/products/:category" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route exact path="/shop/products" render={(props) => <ItemPage handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/shop/stepper" render={(props) => <OrderStepper productAmount={this.state.productAmount} handleAmount={this.handleAmount} islogged={this.state.logged} {...props} />} />
        <Route path="/shop/orders" render={(props) => <OrderHistory logged={this.state.logged} {...props} />} />
        <Route path="/shop/settings" render={(props) => <Settings islogged={this.state.logged} {...props} />} />
        {/* <Route path="/shop/stepper" component={} /> */}
        <Route path="/shop/payment" render={(props) => (
          !this.state.logged ? <Redirect to="/shop/signin" /> : <Payment />)} />
        {this.checkError()}
      </div>
    );
  }
}
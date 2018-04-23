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


class App extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      logged:false
    };
    if(localStorage.getItem('jwtToken'))
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      this.state = {logged: true };
    }
    this.handleLogging = this.handleLogging.bind(this);
  }

  handleLogging = (logged) => { this.setState({logged: logged}) }

  render() {
    return (
      <div className="App">
        <Route path="/admin" component={Admin}/>
        <header>
          <Route path="/" render={(props) => <Header handleLogging={this.handleLogging} islogged={this.state.logged} />} />
        </header>
        <Route exact path="/" component={ImgCarousel} /> 
        <Route path="/signin" render={(props) => <SignIn {...props} handleLogging={this.handleLogging}/>} />
        <Route path="/register" render={(props) => <Register {...props} handleLogging={this.handleLogging} />} />
        <Route exact path="/products" render={(props) => <ItemPage islogged={this.state.logged} {...props}/>}/>
        <Route path="/products/:category/:productId" render={(props) => <Item islogged={this.state.logged} {...props}/>}/>
        <Route exact path="/products/:category" render={(props) => <ItemPage islogged={this.state.logged} {...props}/>}/>
        <Route exact path="/products" render={(props) => <ItemPage islogged={this.state.logged} {...props}/>}/>
        <Route path="/cart" render={(props) => <UserShoppingCart islogged={this.state.logged} {...props}/>} />
        <Route path="/orders" component={OrderHistory} />
        <Route path="/settings" component={Settings} />
        <Route path="/payment" render={(props) => (
          !this.state.logged ? <Redirect to="/signin" /> : <Payment />)} />
          
      </div>
    );
  }
}

export default App;

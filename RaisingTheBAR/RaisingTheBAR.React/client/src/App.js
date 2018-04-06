import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/NavBar/Header';
import ImgCarousel from './components/ImgCarousel';
import SignIn from './components/LoginSignup/SignIn';
import Register from './components/LoginSignup/Register';
import UserShoppingCart from './components/NavBar/UserShoppingCart';
import Payment from './components/Payment';
import ItemPage from './components/ItemPage';
import Item from './components/Item';
import axios from 'axios';
import OrderHistory from './components/OrderHistory';
import Settings from './components/Settings';


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
        <header>
          <Route path="/" render={(props) => <Header handleLogging={this.handleLogging} islogged={this.state.logged} />} />
        </header>
        <Route exact path="/" component={ImgCarousel} /> 
        <Route path="/signin" render={(props) => <SignIn handleLogging={this.handleLogging}/>} />
        <Route path="/register" render={(props) => <Register handleLogging={this.handleLogging} />} />
        {/* <Route exact path="/allitems" component={ItemPage} /> */}
        {/* <Route path="/itempage" component={ItemPage}/> */}
        <Route path="/allitems/:productId" component={Item}/>
        <Route exact path="/products/:category" component={ItemPage}/>
        <Route exact path="/products" componenet={ItemPage}/>
        {/* <Route path="/item" component={Item}/> */}
        <Route path="/cart" component={UserShoppingCart} />
        <Route path="/orders" component={OrderHistory} />
        <Route path="/settings" component={Settings} />
        <Route path="/payment" render={(props) => (
          !this.state.logged ? <Redirect to="/signin" /> : <Payment />)} />
      </div>
    );
  }
}

export default App;

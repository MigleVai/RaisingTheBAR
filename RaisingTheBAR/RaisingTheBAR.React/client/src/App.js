import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import ImgCarousel from './components/ImgCarousel';
import SignIn from './components/LoginSignup/SignIn';
import Register from './components/LoginSignup/Register';
import ItemList from './components/ItemList';

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
      <Router>
        <div className="App">
          <header>
            <Route path="/" render={(props) => <Header logged={this.state.logged} />} />
          </header>
          <Redirect from="/" to="/home" />
          <Route path="/home" component={ImgCarousel}/>
          <Route path="/signin" render={(props) => <SignIn onLogging={this.handleLogging.bind(this)} />} />
          <Route path="/register" component={Register} />
          <Route path="/allitems" component={ItemList} />
        </div>
      </Router>
    );
  }
}

export default App;

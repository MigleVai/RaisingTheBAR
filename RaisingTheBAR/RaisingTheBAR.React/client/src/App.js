import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import ImgCarousel from './components/ImgCarousel';
import SignIn from './components/SignIn';
import Register from './components/Register';
import ItemList from './components/ItemList';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header> {/*className="App-header"*/}
            <Header />
          </header>
          {/* <ImgCarousel /> */}
          {/* <SignIn /> */}
          {/* <Register /> */}
          <Route path="/signin/" component={SignIn}/>
          <Route path="/register/" component={Register}/>  
          <Route path="/allitems/" component={ItemList}/>
        </div>
      </Router>
    );
  }
}

export default App;

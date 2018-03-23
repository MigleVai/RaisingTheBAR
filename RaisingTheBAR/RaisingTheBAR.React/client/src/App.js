import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/MenuBar';
import ImgCarousel from './components/ImgCarousel';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header> {/*className="App-header"*/}
          <MenuBar />
        </header>
        {/* <ImgCarousel /> */}
        {/* <Login /> */}
        <Signup />
      </div>
    );
  }
}

export default App;

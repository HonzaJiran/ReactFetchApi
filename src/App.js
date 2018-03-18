import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/LoginForm';
import Miners from './components/MinersData'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lets fetch it</h1>
        </header>
        <Form />
        <hr />
        <Miners />
      </div>
    );
  }
}

export default App;

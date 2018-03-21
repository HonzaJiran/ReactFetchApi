import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/LoginForm';
import Miners from './components/MinersData'

class App extends Component {
  constructor(props){
    super(props);
  }
  
  handleMiners(){
    console.log('Getting Data...');
    return(
      <Miners />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lets fetch it</h1>
        </header>
        <Form />
        <hr />
        <button onClick={this.handleMiners}>Get data</button>
      </div>
    );
  }
}

export default App;

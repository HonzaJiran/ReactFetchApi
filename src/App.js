import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/LoginForm';
import Miners from './components/MinersData'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_data: false
    }
    this.handleMiners = this.handleMiners.bind(this);
  }
  
  handleMiners(){
    this.setState({show_data:true})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container">
          <br />
          <br />
          <Form />
          <br />
          <hr />
          <button className="btn is-warning" onClick={this.handleMiners}>Miner status</button>
          <br />
          <br />
          {this.state.show_data && <Miners />}
        </div>
      </div>
    );
  }
}

export default App;

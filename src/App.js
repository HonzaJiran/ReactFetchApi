import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/LoginForm';
import Miners from './components/MinersData';
import GraphicCards from './components/GraphicCardData';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_miners: false,
      show_graphic_cards: false
    }
    this.handleMiners = this.handleMiners.bind(this);
    this.handleGraphicCards = this.handleGraphicCards.bind(this);
  }
  
  handleMiners(){
    this.setState({show_graphic_cards:false})
    this.setState({show_miners:true})
  }
  
  handleGraphicCards(){
    this.setState({show_miners:false})
    this.setState({show_graphic_cards:true})
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
          <button className="btn is-primary" onClick={this.handleMiners}>Miner status</button>
          <button className="btn is-primary" onClick={this.handleGraphicCards}>Graphic cards status</button>
          <br />
          <br />
          {this.state.show_miners && <Miners />}
          {this.state.show_graphic_cards && <GraphicCards />}
        </div>
      </div>
    );
  }
}

export default App;

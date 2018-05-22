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
      show_cards: false,
      show_form: false,
      show_buttons: false,
      logout: false,
      logged: false,
      miners: []

    }
    this.handleMiners = this.handleMiners.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGraphicCards = this.handleGraphicCards.bind(this);
  }

  handleMiners(){
    this.setState({show_cards: false, show_miners: true})
  }

  handleGraphicCards(){
    this.setState({show_miners: false, show_cards: true})
  }

  handleLogout(){
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    window.location.reload()
  }

  renewToken(){
      const userAuth = {
        username: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password')
      }

      fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userAuth)
      })
        .then(res => {
          if (!res.ok) {
            this.setState({ show_error: true })
          }else {
            return res.json()
            .then(token => {
              sessionStorage.setItem('jwtToken', token.token);
            })
          }
        })
  }

  componentDidMount(){
    const jwtToken = sessionStorage.getItem('jwtToken');

    fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/miners', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => {
      if (res.ok) {
        console.log('You are logged in.');
        this.handleMiners()
        this.setState({ show_buttons: true })
        this.setState({ logged: true })
      }else {
        console.log('Login first.');
        this.setState({ show_form: true })
      }
    })

    this.tokenTiming = setInterval(
      () => this.renewToken(),
      240000
    );
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
          {this.state.logged &&
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Login successful
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          { this.state.show_form && <Form /> }
          <br />
          {this.state.show_buttons &&
            <div className="buttons">
              <button className="btn btn-primary" onClick={this.handleMiners}>Miner status</button>
              <button className="btn btn-primary" onClick={this.handleGraphicCards}>Graphic cards status</button>
              <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
            </div>
          }
          <br />
          <br />
          { this.state.show_miners && <Miners /> }
          { this.state.show_cards && <GraphicCards /> }
        </div>
      </div>
    );
  }
}

export default App;

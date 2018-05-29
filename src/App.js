import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/LoginForm';
import Miners from './components/MinersData';
import GraphicCards from './components/GraphicCardData';
import Navbar from './components/Navbar';
import Collectors from './components/Collectors';
import AddMiner from './components/adding/AddMiner';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_miners: false,
      show_cards: false,
      show_collectors: false,
      show_form: false,
      show_buttons: false,
      show_addMiner: false,
      logout: false,
      logged: false,
      miners: []

    }
    this.handleMiners = this.handleMiners.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddMiner = this.handleAddMiner.bind(this);
    this.handleCollectors = this.handleCollectors.bind(this);
    this.handleGraphicCards = this.handleGraphicCards.bind(this);
  }

  //PREVIOUS STATE
  handleMiners(){
    this.setState({ show_cards: false, show_miners: true, show_collectors: false, show_addMiner: false })
  }

  handleGraphicCards(){
    this.setState({ show_miners: false, show_cards: true, show_collectors: false, show_addMiner: false })
  }

  handleCollectors(){
    this.setState({ show_miners: false, show_cards: false, show_collectors: true, show_addMiner: false })
  }

  handleAddMiner(){
    this.setState({ show_miners: false, show_cards: false, show_collectors: false, show_addMiner: true })
  }

  handleLogout(){
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    window.location.reload()
  }

  addMiner(){

  }

  componentDidMount(){
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
  }

  render() {
    return (
      <div className="App">
        <Navbar
          handleMiners={this.handleMiners}
          handleGraphicCards={this.handleGraphicCards}
          handleCollectors={this.handleCollectors}
          handleLogout={this.handleLogout}
          handleAddMiner={this.handleAddMiner}
        />
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
          { this.state.show_miners && <Miners /> }
          { this.state.show_cards && <GraphicCards /> }
          { this.state.show_collectors && <Collectors /> }
          { this.state.show_addMiner && <AddMiner /> }

        </div>
      </div>
    );
  }
}

export default App;

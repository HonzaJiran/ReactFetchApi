import React, { Component } from 'react'
import logo from './logo.svg'
import { Route, Redirect } from 'react-router-dom'
import './App.css'

import LoginForm from './components/LoginForm'
import Miners from './components/miners/MinersData'
import Cards from './components/GraphicCardData'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Collectors from './components/Collectors/Collectors'
import Controllers from './components/Controllers/Controllers'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    this.setState({redirect:true})
  }

 

  render() {
    if (this.state.redirect) {
      return (
        <Redirect key="from-navbar" to={'/login'} />
      )
    }
    return (
        <div className="App">
              <div className="main-wrapper">
                  <Route exact path="/login" render={(props) => {
                    return(
                      <div className="login-wrapper">
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <div className="container">
                          <LoginForm />
                        </div>
                      </div>
                    )
                  }} />
                  <Route exact path="/Dashboard" render={(props) => {
                    return(
                      <div className="dashboard-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <div className="container">
                          <Dashboard />
                        </div>
                      </div>
                    )
                  }} />
                  <Route exact path="/Collectors" render={(props) => {
                    return(
                      <div className="collectors-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <Collectors />
                      </div>
                    )
                  }} />
                  <Route exact path="/Miners" render={(props) => {
                    return(
                      <div className="miners-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <Miners />
                      </div>
                    )
                  }} />
                  <Route exact path="/Cards" render={(props) => {
                    return(
                      <div className="cards-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <Cards />
                      </div>
                    )
                  }} />
                  <Route exact path="/Controllers" render={(props) => {
                    return(
                      <div className="controllers-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <div className="container">
                          <Controllers />
                        </div>
                      </div>
                    )
                  }} />
              </div>
        </div>
    )
  }
}

export default App

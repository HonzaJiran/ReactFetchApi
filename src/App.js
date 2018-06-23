import React, { Component } from 'react'
import logo from './logo.svg'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'

import LoginForm from './components/LoginForm'
import Miners from './components/MinersData'
import Cards from './components/GraphicCardData'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Collectors from './components/Collectors/Collectors'

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
          console.log('something went wrong');
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token)
            console.log(token)
          })
        }
      })
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
                      <div className="miners-wrapper">
                        <Navbar handleLogout={this.handleLogout}/>
                        <header className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                        </header>
                        <Cards />
                      </div>
                    )
                  }} />
              </div>
        </div>
    )
  }
}

export default App

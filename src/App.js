import React, { Component } from 'react'
import logo from './logo.svg'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import LoginForm from './components/LoginForm'
import Miners from './components/MinersData'
import GraphicCards from './components/GraphicCardData'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddMiner from './components/adding/AddMiner'
import AddGraphicCard from './components/adding/AddGraphicCard'
import Collectors from './components/Collectors/Collectors'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      logout: false,
      logged: false,
      miners: []

    }
  }

  handleLogout(){
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    window.location.reload()
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
          this.setState({ show_form: true })
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token)
            this.setState({ show_Dashboard: true })
            this.setState({ show_navbar: true })
            console.log(token)
          })
        }
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
              <div className="main-wrapper">
                <Route exact path="/" render={(props) => {
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
                      <Navbar />
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
                      <Navbar />
                      <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                      </header>
                      <Collectors />
                    </div>
                  )
                }} />
              </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

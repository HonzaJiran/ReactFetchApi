import React, { Component } from 'react'
import logo from './logo.svg'
import { Route, Switch } from 'react-router-dom'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css'

import ErrorBoundary from './ErrorBoundary'

import Navigation from './components/Navigation/index'

import Login from './components/LogInPage/index'
import Dashboard from './components/DashboardPage/index'
import Collectors from './components/CollectorsPage/index'
import Miners from './components/MinersPage/index'
import GraphicCards from './components/GraphicCardsPage/index'
import Events from './components/Events/index'

class App extends Component {
  render() {

    return (
      <ErrorBoundary>
        <Navigation />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br/>
        <Switch>
          <Route>
            <div className="container">
              <Route path="/" render={(props) => <Login />} exact />
              <Route path="/Dashboard" render={(props) => <Dashboard />} />
              <Route path="/Collectors" render={(props) => <Collectors />} />
              <Route path="/Miners" render={(props) => <Miners />} />
              <Route path="/GraphicCards" render={(props) => <GraphicCards />} />
              <Route path="/Events" render={(props) => <Events />} />
              <Alert stack={{limit: 3}} />
            </div>
          </Route>
        </Switch>
      </ErrorBoundary>
    )
  }
}

export default App
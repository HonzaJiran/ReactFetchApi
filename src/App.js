import React, { Component } from 'react'
import logo from './logo.svg'
import { Route, Switch } from 'react-router-dom'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css'

import { Provider } from 'react-redux'
import store from './store'

import ErrorBoundary from './ErrorBoundary'

import Navigation from './components/Navigation'

import Login from './components/LogInPage'
import Dashboard from './components/DashboardPage'
import Collectors from './components/CollectorsPage'
import Miners from './components/MinersPage'
import GraphicCards from './components/GraphicCardsPage'
import Events from './components/Events'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <Switch>
            <React.Fragment>
              <Navigation />
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>
              <br/>
              <div className="container">
                <Route path="/" render={(props) => <Login />} exact />
                <Route path="/Dashboard" render={(props) => <Dashboard />} />
                <Route path="/Collectors" render={(props) => <Collectors />} />
                <Route path="/Miners" render={(props) => <Miners />} />
                <Route path="/GraphicCards" render={(props) => <GraphicCards />} />
                <Route path="/Events" render={(props) => <Events />} />
                <Alert stack={{limit: 3}} />
              </div>
            </React.Fragment>
          </Switch>
        </ErrorBoundary>
      </Provider>
    )
  }
}

export default App
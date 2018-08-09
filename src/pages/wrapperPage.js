import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Dashboard from '../components/DashboardPage'
import Collectors from '../components/CollectorsPage'
import Miners from '../components/MinersPage'
import GraphicCards from '../components/GraphicCardsPage'
import Events from '../components/Events'
import MinerStatus from '../components/statuses/minerStatus'
import Alert from 'react-s-alert';
import logo from '../logo.svg'

export default class WrapperPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br/>
        <div className="container">
          <Switch>            
            <Route path="/Dashboard" render={(props) => <Dashboard />} />
            <Route path="/Collectors" render={(props) => <Collectors />} />
            <Route path="/Miners" render={(props) => <Miners />} />
            <Route path="/GraphicCards" render={(props) => <GraphicCards />} />
            <Route path="/Events" render={(props) => <Events />} />  
            <Route path="/MinerStatus" render={(props) => <MinerStatus />} />              
            <Alert stack={{limit: 3}} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

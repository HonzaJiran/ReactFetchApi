import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Alert from 'react-s-alert';
import Login from '../components/LogInPage'
import WrapperPage from './wrapperPage';

export default class RoutingPage extends Component {
  render() {
    return (
      <Switch>          
        <Route path="/" component={Login} exact />
        <Route render={(props) => true ? <WrapperPage/> : <Redirect to='/'/> } />
        <Alert stack={{limit: 3}} />
      </Switch>
    )
  }
}

import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Alert from 'react-s-alert';
import Login from '../components/LogInPage'
import WrapperPage from './wrapperPage';
import { connect } from 'react-redux'

class RoutingPage extends Component {
  render() {
    return (
      <Switch>          
        <Route path="/" component={Login} exact />
        <Route render={(props) => this.props.login ? <WrapperPage/> : <Redirect to='/'/> } />
        <Alert stack={{limit: 3}} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  login:state.login,
});

export default withRouter(connect(mapStateToProps)(RoutingPage));

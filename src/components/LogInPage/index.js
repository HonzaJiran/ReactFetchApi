import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { authUser } from './../../actions/loginActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import logo from '../../logo.svg'

import { Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameInput: '',
      passwordInput: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.authUser(this.state.usernameInput, this.state.passwordInput);

  }

  render() {
    if (this.props.login) {
      return ( <Redirect key="from-login" to={'/miners'} /> )
    }

    return (
      <React.Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br/>
        <div className="login-form container">
          <h5 className="text-left text-primary">Login</h5>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input name="usernameInput" type="text" onChange={this.onChange} value={this.state.usernameInput} className="form-control" id="usernameInput" placeholder="Enter username" required />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input name="passwordInput" type="password" onChange={this.onChange} value={this.state.passwordInput} className="form-control" id="passwordInput" placeholder="Password" required />
            </div>
            <Button bsStyle="success" type="submit">Login</Button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login
})

Login.propTypes = {
  authUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { authUser })(Login)
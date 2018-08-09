import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { authUser } from './../../actions/loginActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from './../common/alert'

import LoginForm from './loginForm'

class LoginContainer extends Component {
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
      return ( <Redirect key="from-login" to={'/events'} /> )
    }

    return (
      <React.Fragment>
       { this.props.authUserFailed && <Alert color="warning" innerText="Bad username or password" /> }
        <LoginForm 
          onChange={this.onChange}
          usernameInput={this.state.usernameInput}
          passwordInput={this.state.passwordInput}
          onSubmit={this.onSubmit}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login,
  authUserFailed: state.authUserFailed
})

LoginContainer.propTypes = {
  authUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { authUser })(LoginContainer)
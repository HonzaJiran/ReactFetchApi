import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { authUser } from './../../actions/loginActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
      return ( <Redirect key="from-login" to={'/miners'} /> )
    }

    return (
      <LoginForm 
        onChange={this.onChange}
        usernameInput={this.state.usernameInput}
        passwordInput={this.state.passwordInput}
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapStateToProps = state => ({
  login: state.login
})

LoginContainer.propTypes = {
  authUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { authUser })(LoginContainer)
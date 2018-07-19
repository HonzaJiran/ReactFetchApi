import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from "axios";
import Alert from 'react-s-alert';

import { Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameInput: '',
      passwordInput: '',
      redirect: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: this.state.usernameInput,
      password: this.state.passwordInput
    })
    .then (res => {
      sessionStorage.setItem('jwtToken', res.data.token)
      sessionStorage.setItem('username', this.state.usernameInput)
      sessionStorage.setItem('password', this.state.passwordInput)
      this.setState({redirect:true})
    })
    .catch(error => {
      Alert.error(`${error}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
  }

  render() {
    if (this.state.redirect) {
      return ( <Redirect key="from-login" to={'/Dashboard'} /> )
    }

    return (
      <div className="login-form">
        <h4>Login</h4>
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
    )
  }
}

export default Login
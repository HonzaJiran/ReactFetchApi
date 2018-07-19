import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    
  }

  AuthUser(){
    axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    })
    .then (res => {
      sessionStorage.setItem('jwtToken', res.data.token)
      window.location.reload()
    })
    .catch(error => {
      return( <Redirect to="/" />)
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
    return this.AuthUser;
    }
    return this.props.children;
  }
}

export default ErrorBoundary
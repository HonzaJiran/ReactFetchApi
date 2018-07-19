import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

export default class AuthUser extends Component {
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
}

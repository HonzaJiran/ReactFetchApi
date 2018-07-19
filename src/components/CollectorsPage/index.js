import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import CollectorsList from './collectorsList'

class Collectors extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: [],
      miners: []
    }
  }

  authUser(){
    axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    })
    .then (res => {
      sessionStorage.setItem('jwtToken', res.data.token)
    })
    .catch(error => {
      return( <Redirect to="/" />)
    })
  }

  componentDidMount(){
    // FETCH COLLECTORS
    fetch('https://monpick.thinkeasy.cz/api/v1/collector/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(collectors => {
      this.setState({ collectors })
    })
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })

    // FETCH MINERS
    fetch('https://monpick.thinkeasy.cz/api/v1/status/miners/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({ miners })
    })
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })
  }

  render(){
    return(
      <div>
        <h5>Collectors</h5>
        <ul className="list-group collectors">
          <CollectorsList collectors={this.state.collectors} miners={this.state.miners} />
        </ul>
      </div>
    )
  }
}

export default Collectors;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Collectors from './collectors'
import Events from './events'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: [],
      miners: [],
      graphicCards: [],
      events: [],
    };
    this.authUser = this.authUser.bind(this);
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
      fetch(`https://monpick.thinkeasy.cz/api/v1/collector/`, {
        method: 'GET',
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

      // FETCH EVENTS
      fetch(`https://monpick.thinkeasy.cz/api/v1/event/6/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        } 
      })
      .then(res => res.json())
      .then(events => {       
        this.setState({ events })
      })
      .catch(error => {
        console.log(error);
        return(this.authUser())
      })

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

      fetch('https://monpick.thinkeasy.cz/api/v1/status/graphiccards/', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => res.json())
      .then(graphicCards => {
        this.setState({ graphicCards })
      })
      .catch(error => {
        console.log(error);
        return(this.authUser())
      })
    }

  render() {
    return (
      <div className="Dashboard">
        <h5 className="text-left text-primary">Collectors</h5>
          <Collectors collector={this.state.collectors} miners={this.state.miners} graphicCards={this.state.graphicCards} />
        <br/>
        <h5 className="text-left text-primary">Latest events</h5>
        <div className="row">
          <Events events={this.state.events} />
        </div>
      </div>
    );
  };
}


export default Dashboard;

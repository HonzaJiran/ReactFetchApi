import React, { Component } from 'react'
import '../../App.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-s-alert';

import MinersList from './minersList'
import AddMiner from './addMiner'

class Miners extends Component {
  constructor(props){
    super(props);
    this.state = {
      miners: [],
      showAll: 'hide'
    };
    this.showAll = this.showAll.bind(this);
    this.authUser = this.authUser.bind(this);
    this.executeMiner = this.executeMiner.bind(this);
  }

  showAll(){
    if (this.state.showAll === 'hide') {
      this.setState({ showAll: 'show' })
    }else {
      this.setState({ showAll: 'hide' })
    }
  }

  authUser(){
    axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    })
    .then (res => {
      console.log(res.data.token);
      
      sessionStorage.setItem('jwtToken', res.data.token)
    })
    .catch(error => {
      console.log(error);
      return( <Redirect to="/" />)
    })
  }

  componentDidMount(){
    fetch('https://monpick.thinkeasy.cz/api/v1/status/miners/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({miners})
    })
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })
  }

  executeMiner(miner){
    if (window.confirm('Do you really want to delete this miner?'))
    {
      fetch(`https://monpick.thinkeasy.cz/api/v1/miner/${miner.miner.id}/`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => {
        Alert.success(`${res}`, {
          position: 'bottom-right',
          effect: 'slide',
          timeout: 'none'
        });
      })
      .catch(error => {
        Alert.error(`${error}`, {
          position: 'bottom-right',
          effect: 'slide',
          timeout: 'none'
        });
      })
    }
  }

  render() {
    return (
      <div className="miners-wrapper">
        <div className="row">
          <button className="btn btn-warning" type="button" onClick={this.showAll}>Show all</button>
          <AddMiner />
        </div>
          <MinersList miners={this.state.miners} onClick={this.executeMiner} className={this.state.showAll}/>
      </div>
    );
  }
}


export default Miners;

import React, { Component } from 'react'
import '../../App.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-s-alert';

import MinersList from './minersList'
import AddMiner from './addMiner'

import { connect } from 'react-redux'
import { fetchMiners } from '../../actions/minerActions'
import PropTypes from 'prop-types'

class Miners extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAll: 'hide'
    };
    this.showAll = this.showAll.bind(this);
    this.authUser = this.authUser.bind(this);
    this.executeMiner = this.executeMiner.bind(this);
  }

  componentWillMount(){
    this.props.fetchMiners()
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
        <h5 className="text-primary text-left">Miners</h5>
        <div className="row">
          <button className="btn btn-warning" type="button" onClick={this.showAll}>Show all</button>
          <AddMiner />
        </div>
          <MinersList miners={this.props.miners} onClick={this.executeMiner} className={this.state.showAll}/>
      </div>
    );
  }
}

Miners.propTypes = {
  fetchMiners: PropTypes.func.isRequired,
  miners: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  miners: state.miners.items
})

export default connect(mapStateToProps, {fetchMiners})(Miners);

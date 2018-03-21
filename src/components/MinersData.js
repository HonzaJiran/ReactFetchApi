import React, { Component } from 'react';
import '../App.css';

class Miners extends Component {
  constructor(props){
    super(props);
    this.state = {
      miners: []
    };
  }

  componentWillMount(){
    const jwtToken = sessionStorage.getItem('jwtToken');
    
    fetch('http://192.168.0.199:7000/api/v1/miner/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => res.json())
    .then(miners => {
      console.log(miners);
    })
  }
  render() {
    const miners = this.state.miners.map(miner => {
      return (
        <div key={miner.id}>
          <h4>{miner.title}</h4>
          <h5>{miner.body}</h5>
        </div>
      );
    })
    return (
      <div className="minersList">
        { miners }
      </div>
    );
  }
}

export default Miners;

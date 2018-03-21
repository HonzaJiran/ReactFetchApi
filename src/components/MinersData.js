import React, { Component } from 'react';
import '../App.css';

class Miners extends Component {
  constructor(props){
    super(props);
    this.state = {
      miners: []
    };
  }

  componentDidMount(){
    //const jwtToken = sessionStorage.getItem('jwtToken');
    
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(miners => {
      this.setState({miners:miners})
    })
  }
  render() {
    const miners = this.state.miners.map(miner => {
      return (
        <div key={miner.id}>
          <h5>{miner.title}</h5>
          <p>{miner.body}</p>
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

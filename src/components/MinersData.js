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
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      this.setState({ miners : data})
    });
  }
  render() {
    const postMiners = this.state.miners.map(miner => {
      return (
        <div key={miner.id}>
          <h4>{miner.title}</h4>
          <h5>{miner.body}</h5>
        </div>
      );
    })
    return (
      <div className="minersList">
        { postMiners }
      </div>
    );
  }
}

export default Miners;

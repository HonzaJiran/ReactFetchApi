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
    const jwtToken = sessionStorage.getItem('jwtToken');
    
    fetch('http://192.168.0.199:7000/api/v1/status/miners', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({miners:miners})
      console.log(this.state.miners)
    })
  }
  render() {
    const miners = this.state.miners.map(miner => {
      //console.log(miner.miner_performance[0].coin.shortcut);
      return (
        <div key={miner.id} className="col s12 m12 l6">
          <div className="card">
            <div className="card-title">
            <br />
            <h5>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</h5><h5>{miner.miner.ip_address}</h5>
            </div>
            <div className="card-content">
              <p>{miner.miner.version}</p>
              <br/>
              {
                miner.miner_performance.map(performance => {
                  return(
                    <div key={performance.coin.id} className="coin_info">
                      <h5>{performance.coin.shortcut}</h5>
                      <p><b>Hashrate: </b>{performance.total_hashrate}</p>
                      <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                      <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                      <p><b>Total shares: </b>{performance.total_shares}</p>
                    </div>
                  );
                })
              }
            </div>
            <div className="card-action">
              
            </div>
          </div>
        </div>
      );
    })
    return (
      <div className="row">
        { miners }
      </div>
    );
  }
}


export default Miners;

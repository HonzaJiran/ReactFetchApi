import React, { Component } from 'react';
import '../App.css';

class Miners extends Component {
  constructor(props){
    super(props);
    this.state = {
      miners: [],
      showAll: 'hide'
    };
    this.showAll = this.showAll.bind(this);
  }

  showAll(){
    if (this.state.showAll === 'hide') {
      this.setState({ showAll: 'show' })
    }else {
      this.setState({ showAll: 'hide' })
    }
  }

  componentDidMount(){
    const userAuth = {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    }

    fetch('http://monpick.thinkeasy.cz:7000/api-auth/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userAuth)
    })
      .then(res => {
        if (!res.ok) {
          this.setState({ show_error: true })
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token);
          })
        }
      })

    const jwtToken = sessionStorage.getItem('jwtToken');

    fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/miners', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({miners:miners})
      console.log(miners);////////////////////////////////
    })
  }

  render() {
    const miners = this.state.miners.map(miner => {
      return (
        <div className="tableCell" key={miner.id}>
          <div id="accordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <p>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
                  <p>{miner.miner.ip_address}</p>
                  <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + miner.id } aria-expanded="false" aria-controls={ "collapse" + miner.id}>
                    <i className="medium material-icons">arrow_downward</i>
                  </button>
                </h5>
              </div>

              <div id={ "collapse" + miner.id} className={"collapse " + this.state.showAll} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <p>{miner.miner.version}</p>
                  {
                    miner.miner_performance.map(performance => {
                      return(
                        <div key={performance.coin.id} className="coin_info">
                          <h5>{performance.coin.shortcut}</h5>
                          <p><b>Total hashrate: </b>{performance.total_hashrate}</p>
                          <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                          <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                          <p><b>Total shares: </b>{performance.total_shares}</p>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
    return (
      <div className="row">
         <button className="btn btn-warning" type="button" onClick={this.showAll}>Show all</button>
        { miners }
      </div>
    );
  }
}


export default Miners;

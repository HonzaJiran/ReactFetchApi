import React, { Component } from 'react';
import './../../App.css';

class Collectors extends Component {
  constructor(props){
    super(props);
    this.state = {
      collectors: [],
      miners: []
    }
  }

  componentDidMount(){
    // USER AUTH
    const jwtToken = sessionStorage.getItem('jwtToken');
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
          console.log('Something went wrong..');
          window.location.reload();
        }else {
          return res.json()
          .then(token => {
            sessionStorage.setItem('jwtToken', token.token);
            console.log(token);
          })
        }
      })

    // FETCH COLLECTORS
    fetch('http://monpick.thinkeasy.cz:7000/api/v1/collector', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwtToken
      }
    })
    .then(res => res.json())
    .then(collectors => {
      console.log(collectors);
      this.setState({ collectors: collectors })
    })

    // FETCH MINERS
    fetch('http://monpick.thinkeasy.cz:7000/api/v1/status/miners', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(miners => {
      this.setState({ miners: miners })
    })
  }

  render(){
    const collectors = this.state.collectors.map(collector => {
      return (
        <li key={collector.id} className="list-group-item d-flex justify-content-between align-items-center">
          {collector.name}
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#exampleModalLong' + collector.id}>
            Collectors's detail
          </button>

          <div className="modal fade" id={'exampleModalLong' + collector.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">{collector.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h5><b>Attributes</b></h5>
                    <div key={collector.id} className="collector-attributes">
                      <h6>Name: <b>{collector.name}</b></h6>
                      <p><b>ID: </b>{collector.id}</p>
                      <p><b>IP address: </b>{collector.ip_address}</p>
                      <p><b>How often: </b>{collector.how_often}</p>
                      <p><b>Is active: </b>{collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
                      </div>
                  <hr/>
                  <h5><b>Relationships</b></h5>
                  {
                    this.state.miners.map(miner => {
                      if (collector.id === miner.miner.collector.id) {
                        return (
                          <div className="tableCell" key={miner.id}>
                            <div id="accordion">
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0">
                                    <b>{miner.miner.id}</b>
                                    <p>{miner.miner.miner_name}</p>
                                    <p>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
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
                                            <p><b>Is active: </b>{performance.total_shares}</p>
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
                      }else {
                        return <p key={miner.id}>Nic tady neni</p>
                      }
                    })
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">Save changes</button>
                  <span className="btn btn-danger">Delete collector</span>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          {collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}
        </li>
      );
    })

    return(
      <div>
        <br/>
        <br/>
        <h5>Collectors</h5>
        <div className="container">
          <ul className="list-group collectors">
            { collectors }
          </ul>
        </div>
      </div>
    )
  }
}

export default Collectors;
// Rozkouskovat!!!
  // <button className="btn btn-primary">Collector's detail</button>
  // <button className="btn btn-warning">Edit collector</button>
  // <button className="btn btn-success">Add new collector</button>
  // <button className="btn btn-danger">Delete collector</button>
// Rozkouskovat!!!{collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}
// <button className="btn btn-primary">Collector's detail</button>
// <button className="btn btn-warning">Edit collector</button>
// <button className="btn btn-danger">Delete collector</button>

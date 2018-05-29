import React, { Component } from 'react';

class addMiner extends Component {
  constructor(props){
    super(props);
    this.state = {
      miner_name: '',
      ip_address: '',
      mining_password: '',
      collector: '',
      is_disabled: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    }

  onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const minerInfo = {
      miner_name: this.state.miner_name,
      ip_address: this.state.ip_address,
      mining_password: this.state.mining_password,
      collector: this.state.collector,
      is_disabled: true
    }

    const jwtToken = sessionStorage.getItem('jwtToken');

    fetch('http://monpick.thinkeasy.cz:7000/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + jwtToken
      },
      body: JSON.stringify(minerInfo)
    })
      .then(res => {
        if (!res.ok) {
          console.log('nepovedlo se');
        }else {
          return res.json()
          .then(token => {
            console.log('jak nic');
          })
        }
      })
  }

  render() {
    return (
      <div className="miners-adding">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input onChange={this.onChange} value={this.state.miner_name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter miner name"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">IP address</label>
            <input onChange={this.onChange} value={this.state.ip_address} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter miner ip address"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputMiningPassword">Mining password</label>
            <input onChange={this.onChange} value={this.state.mining_password} type="text" className="form-control" id="exampleInputMiningPassword" placeholder="Enter mining password"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCollectorsId">Collectors ID</label>
            <input onChange={this.onChange} value={this.state.collector} type="text" className="form-control" id="exampleInputCollectorsId" placeholder="Enter collectors ID"/>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    );
  };
}


export default addMiner;

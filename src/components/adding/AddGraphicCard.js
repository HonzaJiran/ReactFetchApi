import React, { Component } from 'react';

class AddGraphicCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      miner_name: '',
      ip_address: '',
      mining_password: '',
      collector: '',
      is_disabled: true,
      collectors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

      // GET COLLECTORS

      fetch('http://monpick.thinkeasy.cz:7000/api/v1/collector', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
        }
      })
      .then(res => res.json())
      .then(collectors => {
        this.setState({ collectors:collectors })
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.is_disabled);
  }

  render() {
    return (
      <div className="miners-adding">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input type="text" name="miner_name" className="form-control" onChange={this.onChange} value={this.state.miner_name} id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter miner name" required/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">IP address</label>
            <input name="ip_address" onChange={this.onChange} value={this.state.ip_address} type="text" className="form-control" id="exampleInputPassword" placeholder="Enter miner ip address" required/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputMiningPassword">Mining password</label>
            <input name="mining_password" onChange={this.onChange} value={this.state.mining_password} type="text" className="form-control" id="exampleInputMiningPassword" placeholder="Enter mining password" required/>
          </div>
          <div className="form-group">
            <label htmlFor="selectCollector">Collector name</label>
            <br/>
            <select name="collector" value={this.state.collector} onChange={this.onChange}>
              {this.state.collectors.map(collector => {
                return <option key={collector.id} value={collector.id}>{collector.name}</option>
              })}
            </select>
            <br/><br/>
            <label htmlFor="is_disabled">Is disabled:</label>
            <input
              name="is_disabled"
              type="checkbox"
              defaultChecked={this.state.is_disabled}
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    );
  };
}


export default AddGraphicCard;

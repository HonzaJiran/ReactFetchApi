import React, { Component } from 'react'
import Alert from 'react-s-alert';

export default class ScanMiners extends Component {
  constructor(props){
    super(props)
    this.state = {
      ipRange: '',
      scanName: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const scanInfo = {
      name: this.state.scanName,
      range: this.state.ipRange
    }

    fetch('https://monpick.thinkeasy.cz/api/v1/collector/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(scanInfo)
    })
    .then(res => res.json())
    .then(response => {
      Alert.success(`${response.detail}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
      console.log(response);
      
    })
    .catch(error => {
      console.log(error);
      Alert.error(`${error}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
  }

  render() {
    return (
      <div className="miner-scan">
        <h5 className="text-primary"><b>Scan for minners</b></h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="scan-range">Range: </label>
            <input name="ipRange" onChange={this.onChange} value={this.state.ipRange} type="text" className="form-control" placeholder="Enter IP range" />
          </div>
          <div className="form-group">
            <label htmlFor="scan-name">Name: </label>
            <input name="scanName" onChange={this.onChange} value={this.state.scanName} type="text" className="form-control" placeholder="Enter name" />
          </div>
          <button type="submit" className="btn btn-primary">Scan</button>
        </form>
      </div>
    )
  }
}

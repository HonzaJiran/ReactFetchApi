import React, { Component } from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'

import { scanMiners } from './../../actions/collectorActions'

class ScanMiners extends Component {
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

    this.props.scanMiners(scanInfo)
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

ScanMiners.proptypes = {
  scanMiners: Proptypes.func.isRequired
}

export default connect(null, { scanMiners })(ScanMiners)
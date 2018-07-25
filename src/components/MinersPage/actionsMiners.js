import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { minerAction } from './../../actions/minerActions'

class ActionsMiners extends Component {
  constructor(props){
    super(props)
    this.state = {
      miner_action: 0
    }
    this.onChange = this.onChange.bind(this)
  }

  makeAction(){
    const actionInfo = {
      miner: this.props.id,
      miner_action: this.state.miner_action
    }

    console.log(actionInfo);
    
    this.props.minerAction(actionInfo)
  }

  onChange(e) {
    this.setState({miner_action: e.target.value});
  }

  render() {
    return (
      <div className="miners-actions">
        <h4 className="text-primary"><b>Actions</b></h4>
        <select value={this.state.miner_action} onChange={this.onChange}>
          <option value="1">Miner restart</option>
          <option value="2">Miner reboot</option>
          <option value="3">Miner start</option>
          <option value="4">Machine power</option>
          <option value="5">Machine reeboot</option>
          <option value="6">stop</option>
          <option value="7">Machine status</option>
        </select>
        <button onClick={this.makeAction.bind(this)} type="button" className="btn btn-success">
          Send action
        </button>
      </div>
    )
  }
}


ActionsMiners.propTypes = {
  minerAction: PropTypes.func.isRequired
}

export default connect(null, { minerAction })(ActionsMiners)
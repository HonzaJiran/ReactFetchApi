import React, { Component } from 'react'

export default class ActionsMiners extends Component {
  constructor(props){
    super(props)
    this.state = {
      action: 0
    }
  }

  makeAction(){
    const actionInfo = {
      miner: this.props.id,
      action: this.state.action
    }

    const url = 'https://monpick.thinkeasy.cz/api/v1/miner/action/'

    fetch(url, {
      method: 'POST', //should be GET by monpick
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(actionInfo)
    })
    .then(res => {
      console.log(res);
      
    })
  }

  onChange(e) {
    this.setState({action: e.target.value});
  }

  render() {
    return (
      <div className="miners-actions">
        <h4 className="text-primary"><b>Actions</b></h4>
        <select value={this.state.action} onChange={this.onChange.bind(this)}>
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

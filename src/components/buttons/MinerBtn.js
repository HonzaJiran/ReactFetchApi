import React, { Component } from 'react';

class MinerBtn extends Component {
  render(){
    return(
      <a className="dropdown-item" onClick={this.props.handleMiners} href="#">Miners</a>
    )
  }
}

export default MinerBtn;

import React, { Component } from 'react';

class CollectorBtn extends Component {
  render(){
    return(
      <a className="nav-link" onClick={this.props.handleCollectors} href="#">Collectors</a>
    )
  }
}

export default CollectorBtn;

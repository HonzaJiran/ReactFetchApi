import React, { Component } from 'react';

class DashboardBtn extends Component {
  render(){
    return(
      <a className="navbar-brand" href="#main" onClick={this.props.handleCollectors}>Dashboard</a>
    )
  }
}

export default DashboardBtn;

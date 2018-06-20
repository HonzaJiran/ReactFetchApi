import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DashboardBtn extends Component {
  render(){
    return(
      <Link to="/Dashboard" className="navbar-brand">Dashboard</Link>
    )
  }
}

export default DashboardBtn;

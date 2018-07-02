import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ControllersBtn extends Component {
  render(){
    return(
      <Link to="/Controllers" className="navbar-brand">Controllers</Link>
    )
  }
}

export default ControllersBtn;

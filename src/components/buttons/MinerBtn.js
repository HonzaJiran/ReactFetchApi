import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MinerBtn extends Component {
  render(){
    return(
      <Link className="navbar-brand" to="/Miners">Miners</Link>
    )
  }
}

export default MinerBtn;

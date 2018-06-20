import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CollectorBtn extends Component {
  render(){
    return(
      <Link to="/Collectors" className="navbar-brand">Collectors</Link>
    )
  }
}

export default CollectorBtn;

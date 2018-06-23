import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GraphicBtn extends Component {
  render(){
    return(
      <Link to="/Cards" className="navbar-brand">Graphic cards</Link>
    )
  }
}

export default GraphicBtn;

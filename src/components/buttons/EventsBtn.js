import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventsBtn extends Component {
  render(){
    return(
      <Link to="/Events" className="navbar-brand">Events</Link>
    )
  }
}

export default EventsBtn;

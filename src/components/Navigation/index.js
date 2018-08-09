import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { logOutUser } from '../../actions/loginActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Navigation extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this)
  }
  logOut(){
    this.props.logOutUser();
  }
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/Dashboard">Dashboard</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/Collectors">Collectors</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/Miners">Miners</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/GraphicCards">GraphicCard status</NavLink>
            </li>          
            
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/MinerStatus">Miner Status</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/Events">Events</NavLink>
            </li>
            <li className="nav-item">
              <a className="navbar-brand text-danger" onClick={this.logOut}>Log out</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Navigation.propTypes = {
  logOutUser: PropTypes.func.isRequired
}

export default connect(null, { logOutUser })(Navigation);

/*
<li className="nav-item">
  <NavLink className="navbar-brand" to="/GraphicCardStatus">GC Status</NavLink>
</li>
*/
import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
            <NavLink className="navbar-brand" to="/GraphicCards">Graphics cards</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="navbar-brand" to="/Controllers">Controllers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="navbar-brand" to="/Events">Events</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation;

import React, { Component } from 'react';

import MinerBtn from './buttons/MinerBtn';
import GraphicBtn from './buttons/GraphicBtn';
import DashboardBtn from './buttons/DashboardBtn';
import CollectorBtn from './buttons/CollectorBtn';
import ControllersBtn from './buttons/ControllersBtn';
import EventsBtn from './buttons/EventsBtn';

class Navbar extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <DashboardBtn />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <CollectorBtn/>
            </li>
            <li className="nav-item">
              <MinerBtn/>
            </li>
            <li className="nav-item">
              <GraphicBtn/>
            </li>
            <li className="nav-item">
              <ControllersBtn/>
            </li>
            <li className="nav-item">
              <EventsBtn/>
            </li>
            <button onClick={this.props.handleLogout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

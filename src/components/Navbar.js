import React, { Component } from 'react';

import MinerBtn from './buttons/MinerBtn';
import GraphicBtn from './buttons/GraphicBtn';
import CollectorBtn from './buttons/CollectorBtn';

class Navbar extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="index">Default</a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Statuses <span className="sr-only">(current)</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <MinerBtn handleMiners={this.props.handleMiners}/>
                <GraphicBtn handleGraphicCards={this.props.handleGraphicCards}/>
                <CollectorBtn handleCollectors={this.props.handleCollectors}/>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.props.handleAddMiner} href="#">Add miner</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <button onClick={this.props.handleLogout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

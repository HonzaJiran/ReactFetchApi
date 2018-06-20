import React, { Component } from 'react';

// import MinerBtn from './buttons/MinerBtn';
// import GraphicBtn from './buttons/GraphicBtn';
import DashboardBtn from './buttons/DashboardBtn';
import CollectorBtn from './buttons/CollectorBtn';

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
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#Add" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add new
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                <a className="dropdown-item" onClick={this.props.handleAddMiner} href="#AddMiner">Miner</a>
                <a className="dropdown-item" onClick={this.props.handleAddGraphicCard} href="#AddGraphicCard">Graphic card</a>
              </div>
            </li>
            <button onClick={this.props.handleLogout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;

// <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <a className="navbar-brand" href="#main">Heading</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavDropdown">
//     <ul className="navbar-nav">
//       <li className="nav-item active dropdown">
//         <a className="nav-link dropdown-toggle" href="#Statutes" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Collectors <span className="sr-only">(current)</span>
//         </a>
//         <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
//           <MinerBtn handleMiners={this.props.handleMiners}/>
//           <GraphicBtn handleGraphicCards={this.props.handleGraphicCards}/>
//           <CollectorBtn handleCollectors={this.props.handleCollectors}/>
//         </div>
//       </li>
//       <li className="nav-item dropdown">
//         <a className="nav-link dropdown-toggle" href="#Add" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Add new
//         </a>
//         <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
//           <a className="dropdown-item" onClick={this.props.handleAddMiner} href="#AddMiner">Miner</a>
//           <a className="dropdown-item" onClick={this.props.handleAddGraphicCard} href="#AddGraphicCard">Graphic card</a>
//         </div>
//       </li>
//       <button onClick={this.props.handleLogout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
//     </ul>
//   </div>
// </nav>

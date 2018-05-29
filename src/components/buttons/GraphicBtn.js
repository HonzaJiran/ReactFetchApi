import React, { Component } from 'react';

class GraphicBtn extends Component {
  render(){
    return(
      <a className="dropdown-item" onClick={this.props.handleGraphicCards} href="#">Graphic cards</a>
    )
  }
}

export default GraphicBtn;

import React, { Component } from 'react';

import Collapse from './../common/collapse'

export default class eventElement extends Component {
  render(){
    const { item, show } = this.props;
    return(
      <Collapse
        header={
          <p>{item.date}</p>
        } 
        body={
          <React.Fragment>
            <h5 className="text-primary"><b>Description</b></h5>
            <p>{item.description}</p>
            <span className="text-primary"><b>User: </b></span>
            <span>{item.user || "No user id"}</span>
          </React.Fragment>
        }
        show={show}     
      />
    );
  }
}
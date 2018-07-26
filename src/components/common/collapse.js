import React, { Component } from 'react';

export default class Collapse extends Component{
  constructor(props){
    super(props);
    this.state = { show:false };
  }

  componentDidUpdate(prevProps){
    if(prevProps.show===this.props.show){
      return;
    }
    this.setState({show:this.props.show});
  }

  render(){
    const { header, body } = this.props;
    return (
      <div className="tableCell">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              {header}
              <button 
                className="btn btn-link" 
                onClick={e=>this.setState({show: !this.state.show})}>
                <i className="medium material-icons">arrow_downward</i>
              </button>
            </h5>
          </div>
          <div className="card-body" aria-labelledby="headingOne">
            {this.state.show ? body :  null}
          </div>
        </div>
      </div>
    );
  }
};


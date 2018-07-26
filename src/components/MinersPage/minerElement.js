import React, { Component } from 'react';
import EditMiner from './editMiner';
import ActionsMiners from './actionsMiners';
import Collapse from '../common/collapse';

export default class MinerElement extends Component{
  constructor(props){
    super(props);
    this.state = { show:false };
  }

  render(){
    const { item } = this.props;
    return (
      <Collapse
        show={this.props.show}
        header={this.getHeader(item)}
        body={this.getBody(item)}
      />
    );
  }

  getHeader(miner){
    return (
      <div>   
        <p>{miner.is_active ? 
          <i className="medium material-icons icon-green">check</i> : 
          <i className="medium material-icons icon-red">close</i>}
        </p>
        <b>{miner.miner.id}</b>
        <p>{miner.miner.miner_name}</p>
        <p>{miner.miner.ip_address}</p>
      </div>);
  }

  getBody(miner){
    return(
      <div >
        <div >
          <h4 className="text-primary">Attributes</h4>
            <p><b>Miner id: </b>{miner.miner.id}</p>
            <p><b>Miner name: </b>{miner.miner.miner_name}</p>
            <p><b>Miner IP adress: </b>{miner.miner.ip_address}</p>
            <p><b>Is active: </b>{miner.is_active ? 
              <span className='text-success'>TRUE</span> : 
              <span className='text-danger'>FALSE</span> }</p>
            <p><b>Is disabled: </b>{miner.miner.is_disabled ? 
              <span className='text-danger'>DISABLED</span> : 
              <span className='text-success'>ENABLED</span> }</p>
            <p><b>Version: </b>{miner.miner.version}</p>
            
          <h4 className="text-primary">Statistics</h4>
          {
            miner.miner_performance.map(performance => {
              return(
                <div key={performance.coin.id} className="coin_info">
                  <h5 className="text-secondary">{performance.coin.shortcut}</h5>
                  <p><b>Total hashrate: </b>{performance.total_hashrate}</p>
                  <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                  <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                  <p><b>Total shares: </b>{performance.total_shares}</p>
                </div>
              );
            })
          }
          <h4 className="text-primary">Relationships</h4>
          <h6><b>Name: </b>{miner.miner.collector.name}</h6>
          <p><b>ID: </b>{miner.miner.collector.id}</p>
          <p><b>IP address: </b>{miner.miner.collector.ip_address}</p>
          <p><b>How often: </b>{miner.miner.collector.how_often}</p>
          <p><b>Is active: </b>{miner.miner.collector.is_active ? 
            <span className='text-success'>TRUE</span> : 
            <span className='text-danger'>FALSE</span> }</p>
          <EditMiner id={miner.miner.id}/>
          <button
            type="button"
            className="btn btn-danger"
            //onClick={props.executeMiner(this,miner)}
            >
            Delete
          </button>
          <hr />
          <ActionsMiners id={miner.miner.id} />
        </div>
      </div>);
  }

};


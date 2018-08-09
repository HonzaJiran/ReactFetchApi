import React, { Component } from 'react';
import EditMiner from './editMiner';
import ActionsMiners from './actionsMiners';
import Collapse from '../common/collapse';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteMiner } from '../../actions/minerActions'

class MinerElement extends Component{
  constructor(props){
    super(props);
    this.state = { show:false };
    this.deleteMiner = this.deleteMiner.bind(this);
  }

  deleteMiner(id){
    this.props.deleteMiner(id)
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
        <p>{miner.is_disabled ? 
          <i className="medium material-icons icon-red">close</i> :
          <i className="medium material-icons icon-green">check</i>}
        </p>
        <b>{miner.id}</b>
        <p>{miner.miner_name}</p>
        <p>{miner.ip_address}</p>
      </div>);
  }

  getBody(miner){
    return(
      <div >
        <div >
          <h4 className="text-primary">Attributes</h4>
            <p><b>Miner id: </b>{miner.id}</p>
            <p><b>Miner name: </b>{miner.miner_name}</p>
            <p><b>Miner IP adress: </b>{miner.ip_address}</p>
            <p><b>Miner runtime: </b>{miner.runtime}</p>
            <p><b>Is disabled: </b>{miner.is_disabled ? 
              <span className='text-danger'>DISABLED</span> : 
              <span className='text-success'>ENABLED</span> }</p>
            <p><b>Version: </b>{miner.version}</p>

          <h4 className="text-primary">Relationships</h4>
          <h6><b>Name: </b>{miner.collector.name}</h6>
          <p><b>ID: </b>{miner.collector.id}</p>
          <p><b>IP address: </b>{miner.collector.ip_address}</p>
          <p><b>How often: </b>{miner.collector.how_often}</p>
          <p><b>Is active: </b>{miner.collector.is_active ? 
            <span className='text-success'>TRUE</span> : 
            <span className='text-danger'>FALSE</span> }</p>
          <EditMiner id={miner.id}/>
      
          <hr />
          <ActionsMiners id={miner.id} />
        </div>
      </div>);
  }
};

MinerElement.proptypes = ({
  deleteMiner: PropTypes.func.isRequired
})


export default connect( null, { deleteMiner })(MinerElement)
import React from 'react'

import EditMiner from './editMiner'
import ActionsMiners from './actionsMiners'

const MinersList = (props) => {
  const divStyle = {
    width: '100%'
  }
  return(
    <div>
    {
      props.miners.map(miner => {
        return (
          <div style={divStyle} className="tableCell" key={miner.id}>
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <p>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
                    <b>{miner.miner.id}</b>
                    <p>{miner.miner.miner_name}</p>
                    <p>{miner.miner.ip_address}</p>
                    <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + miner.id } aria-expanded="false" aria-controls={ "collapse" + miner.id}>
                      <i className="medium material-icons">arrow_downward</i>
                    </button>
                  </h5>
                </div>
                <div id={ "collapse" + miner.id} className={"collapse " + props.showAll} aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <h4 className="text-primary">Statistics</h4>
                    <p><b>Version: </b>{miner.miner.version}</p>
                    {
                      miner.miner_performance.map(performance => {
                        return(
                          <div key={performance.coin.id} className="coin_info">
                            <h6 className="text-secondary">{performance.coin.shortcut}</h6>
                            <p><b>Total hashrate: </b>{performance.total_hashrate}</p>
                            <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                            <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                            <p><b>Total shares: </b>{performance.total_shares}</p>
                            <p><b>Is active: </b>{miner.is_active === true ? <span className='text-success'>TRUE</span> : <span className='text-danger'>FALSE</span> }</p>
                            <p><b>Is disabled: </b>{miner.miner.is_disabled === true ? <span className='text-success'>ENABLED</span> : <span className='text-danger'>DISABLED</span> }</p>
                          </div>
                        );
                      })
                    }
                    <h4 className="text-primary">Relationships</h4>
                    <h6><b>Name: </b>{miner.miner.collector.name}</h6>
                    <p><b>ID: </b>{miner.miner.collector.id}</p>
                    <p><b>IP address: </b>{miner.miner.collector.ip_address}</p>
                    <p><b>How often: </b>{miner.miner.collector.how_often}</p>
                    <p><b>Is active: </b>{miner.miner.collector.is_active === true ? <span className='text-success'>TRUE</span> : <span className='text-danger'>FALSE</span> }</p>
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
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
    </div>
  )
}

export default MinersList

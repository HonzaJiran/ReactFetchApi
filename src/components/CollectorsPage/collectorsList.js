import React from 'react'
import AddNewToCollector from './AddNewToCollector'
import ScanMiners from './ScanMiners'

const CollectorsList = (props) => {
  return (
    <div>
      {
      props.collectors.map(collector => {
      return (
        <li key={collector.id} className="list-group-item d-flex justify-content-between align-items-center">
          <p>{collector.name}</p>
          <button type="button" className="btn detail-btn btn-primary" data-toggle="modal" data-target={'#exampleModalLong' + collector.id}>
            Collectors's detail
          </button>

          <div className="modal fade" id={'exampleModalLong' + collector.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">{collector.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h5 className="text-primary"><b>Attributes</b></h5>
                    <div key={collector.id} className="collector-attributes">
                      <h6><b>Name: </b>{collector.name}</h6>
                      <p><b>ID: </b>{collector.id}</p>
                      <p><b>IP address: </b>{collector.ip_address}</p>
                      <p><b>How often: </b>{collector.how_often}</p>
                      <p><b>Is active: </b>{collector.is_active === true ? <span className='text-success'>TRUE</span> : <span className='text-danger'>FALSE</span> }</p>
                      </div>
                  <hr/>
                  <h5 className="text-primary"><b>Relationships</b></h5>
                  {
                    props.miners.map(miner => {
                      if (collector.id === miner.miner.collector.id) {
                        return (
                          <div className="tableCell" key={miner.id}>
                            <div id="accordion">
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0">
                                    <b>{miner.miner.id}</b>
                                    <p>{miner.miner.miner_name}</p>
                                    <p>{miner.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
                                    <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + miner.id } aria-expanded="false" aria-controls={ "collapse" + miner.id}>
                                      <i className="medium material-icons">arrow_downward</i>
                                    </button>
                                  </h5>
                                </div>

                                <div id={ "collapse" + miner.id} className={"collapse false"} aria-labelledby="headingOne" data-parent="#accordion">
                                  <div className="card-body">
                                    <p><b>Version: </b>{miner.miner.version}</p>
                                    {
                                      miner.miner_performance.map(performance => {
                                        return(
                                          <div key={performance.coin.id} className="coin_info">
                                            <h5 className="text-primary">{performance.coin.shortcut}</h5>
                                            <p><b>Total hashrate: </b>{performance.total_hashrate} MH/s</p>
                                            <p><b>Invalid shares: </b>{performance.total_invalid_shares}</p>
                                            <p><b>Rejected shares: </b>{performance.total_rejected_shares}</p>
                                            <p><b>Total shares: </b>{performance.total_shares}</p>  
                                          </div>
                                        );
                                      })
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }else {
                        return null;
                      }
                    })
                  }
                  <AddNewToCollector id={collector.id} collName={collector.name} />
                  <hr/>
                  <ScanMiners currentScannedMinerId={collector.id} currentScannedMinerName={collector.name} />
                </div>
              </div>
            </div>
          </div>
          {collector.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}
        </li>
      );
    })
    }
    </div>
  )
}

export default CollectorsList


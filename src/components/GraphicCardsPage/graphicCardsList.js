import React from 'react'

import EditGraphicCard from './editGraphicCard'

const GraphicCardsList = (props) => {
  const style = {
    width: '100%'
  }
  return (
    <div className="gpus-list" style={style}>
      {
      props.graphicCards.map(graphicCard => {
      return (
        <div className="tableCell" key={graphicCard.id}>
          <div id="accordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <b>{graphicCard.graphic_card.id}</b>
                  <p>{graphicCard.graphic_card.name}</p>
                  <p>{graphicCard.is_active === true ? <i className="medium material-icons icon-green">check</i> : <i className="medium material-icons icon-red">close</i>}</p>
                  <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + graphicCard.id} aria-expanded="false" aria-controls={ "collapse" + graphicCard.id}>
                    <i className="medium material-icons">arrow_downward</i>
                  </button>
                </h5>
              </div>

              <div id={ "collapse" + graphicCard.id} className={"collapse " + props.showAll} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">

                <h5 className="text-primary">Attributes</h5>
                <p><b>ID: </b>{graphicCard.graphic_card.id}</p>
                <p><b>Core clock: </b>{graphicCard.graphic_card.core_clock}</p>
                <p><b>Memory clock: </b>{graphicCard.graphic_card.mem_clock}</p>
                <p><b>Memory size: </b>{graphicCard.graphic_card.mem_size}</p>
                <p><b>Number: </b>{graphicCard.graphic_card.number}</p>
                <p><b>VVDC: </b>{graphicCard.graphic_card.vvdc}</p>
                <p><b>Temperature: </b>{graphicCard.graphic_card.temperature}</p>
                <p><b>Is active: </b>{graphicCard.is_active === true ? <span className='text-success'>TRUE</span> : <span className='text-danger'>FALSE</span> }</p>
                <p><b>Is disabled: </b>{graphicCard.graphic_card.is_disabled === true ? <span className='text-danger'>DISABLED</span> : <span className='text-success'>ENABLED</span> }</p>

                <h5 className="text-primary">Statistics</h5>
                    {
                      graphicCard.gpu_performance.map(performance => {
                        return(
                          <div key={performance.coin.id} className="GraphicCard_coin_info">
                            <h5 className="text-secondary">{performance.coin.shortcut}</h5>
                            <p><b>Hashrate: </b>{performance.hashrate}</p>
                            <p><b>Invalid shares: </b>{performance.invalid_shares}</p>
                            <p><b>Rejected shares: </b>{performance.rejected_shares}</p>
                            <p><b>Shares: </b>{performance.shares}</p>
                          </div>
                        );
                      })
                    }
                    <h5 className="text-primary">Relationships</h5>
                    <p><b>Miner name: </b>{ graphicCard.graphic_card.miner.miner_name }</p>
                    <p><b>Miner ip_address: </b>{ graphicCard.graphic_card.miner.ip_address }</p>
                    <p><b>Runtime: </b>{ graphicCard.graphic_card.miner.runtime }</p>
                    <EditGraphicCard id={graphicCard.graphic_card.id}/>
                    <button
                    type="button"
                    className="btn btn-danger"
                    //onClick={this.executeGraphicCard.bind(this,graphicCard)}
                    >
                    Delete
                  </button>
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

export default GraphicCardsList
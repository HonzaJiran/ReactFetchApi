import React from 'react'

const EventList = (props) => {
  return (
    <React.Fragment>
    {props.events.map(event => {
      return(
        <div className="tableCell" key={event.date}>
          <div id="accordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <p>{event.date}</p>
                  <button className="btn btn-link" data-toggle="collapse" data-target={ "#collapse" + event.date } aria-expanded="false" aria-controls={ "collapse" + event.date}>
                    <i className="medium material-icons">arrow_downward</i>
                  </button>
                </h5>
              </div>
    
              <div id={ "collapse" + event.date} className={"collapse " + 'this.props.showAll'} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <h4 className="text-primary"><b>Description</b></h4>
                  <p>{event.description}</p>
                  <span className="text-primary"><b>User: </b></span>
                  <span>{event.user || "No user id"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })}
    </React.Fragment>
  )
}

export default EventList
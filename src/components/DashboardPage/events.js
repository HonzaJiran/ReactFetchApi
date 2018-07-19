import React from 'react'

const Events = (props) => {
  return (
    props.events.map(event => {
      return(
        <div key={event.date} className="card events-card">
          <div className="card-body">
            <h5 className="card-title">{event.date}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{event.user}</h6>
            <p className="card-text">{event.description}</p>
          </div>
        </div>
      )
    })
  )
}

export default Events
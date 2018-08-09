import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

const widthStyle = {
  width: '100%',
}

const itemStyle = {
  margin: '2.5px'
}

const Events = (props) => {
  return (
    <ListGroup style={widthStyle}>
      {props.events.map(event => {
        return(
          <ListGroupItem style={itemStyle} key={event.date}>
            <b>Date: </b>{ event.date }
            <br/>
            <b>User: </b> <span className="text-primary">{ event.user || 'no user ID.' }</span>
            <br/>
            <b>Description: </b><span>{ event.description }</span>
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}

export default Events
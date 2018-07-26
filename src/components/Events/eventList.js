import React from 'react';
import EventElement from './eventElement';
import List from '../common/list';

const EventList = (props) => {
  return (
    <List
      items={props.events}
      elementType={EventElement}
    />
  )
}

export default EventList
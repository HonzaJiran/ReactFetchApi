import { FETCH_EVENTS } from './types'
import { request } from './../request' 

export const fetchEvents = (max) => dispatch => {
  request(`/event/${max || ''}`)
  .then(events => dispatch({
    type: FETCH_EVENTS,
    payload: events
  }))
}
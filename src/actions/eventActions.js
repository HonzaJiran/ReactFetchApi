import { FETCH_EVENTS } from './types'

export const fetchEvents = (max) => dispatch => {
  fetch(`https://monpick.thinkeasy.cz/api/v1/event/${max || ''}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(events => dispatch({
      type: FETCH_EVENTS,
      payload: events
    }))
    .catch(error => {
      console.log(error);
      return(this.authUser())
    })
}
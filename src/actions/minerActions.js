import {FETCH_MINERS, ADD_MINER} from './types'

export const fetchMiners = () => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/status/miners/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(items => dispatch({
      type: FETCH_MINERS,
      payload: items
    }))
    .catch(error => {
      console.log(error);
    })
}

export function addMiner(minerInfo,dispatch) {
  fetch('https://monpick.thinkeasy.cz/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(minerInfo)
    })
    .then(res => res.json())
    .then(item => dispatch({
      type: ADD_MINER,
      payload: item
    }))
    .catch(error =>{
      console.log(error);
    })
}
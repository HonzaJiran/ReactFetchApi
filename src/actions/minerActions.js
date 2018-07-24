import {FETCH_MINERS, ADD_MINER, EDIT_MINER, MINER_ACTION} from './types'
import Alert from 'react-s-alert';

export const fetchMiners = () => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/status/miners/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(miners => dispatch({
      type: FETCH_MINERS,
      payload: miners
    }))
    .catch(error => {
      console.log(error);
    })
}

export const addMiner = minerInfo => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(minerInfo)
    })
    .then(res => res.json())
    .then(miner => dispatch({
      type: ADD_MINER,
      payload: miner
    }))
    .then( response => {
      Alert.success(`Miner "${response.payload.miner_name}" Added`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
    .catch(error =>{
      console.log(error);
    })
}

export const editMiner = (minerInfo,id) => dispatch => {
  fetch(`https://monpick.thinkeasy.cz/api/v1/miner/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
    },
    body: JSON.stringify(minerInfo)
    })
    .then(res => res.json())
    .then(miner => dispatch({
      type: EDIT_MINER,
      payload: miner
    }))
    .then(response => {
      Alert.success(`Miner edited.`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
}

export const minerAction = actionInfo => dispatch => {
  fetch(`https://monpick.thinkeasy.cz/api/v1/miner/action/`, {
      method: 'POST', //should be GET by monpick
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(actionInfo)
    })
    .then(miner_action => dispatch({
      type: MINER_ACTION,
      payload: miner_action
    }))
    .then(response => {
      Alert.success(`action ${response} make.`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
    .catch(error => {
      console.log(error);      
    })
}
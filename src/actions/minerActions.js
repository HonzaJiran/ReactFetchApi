import {FETCH_MINERS, ADD_MINER, EDIT_MINER, MINER_ACTION} from './types'
import Alert from 'react-s-alert';

import { request } from './../request'

export const fetchMiners = () => dispatch => {
  request(`/status/miners`)
  .then(miners => dispatch({
    type: FETCH_MINERS,
    payload: miners
  }))
  .catch(error => {
    console.log(error);
  })
}

export const addMiner = minerInfo => dispatch => {
  request(`/status/miners`, {
    method: 'POST',
    body: JSON.stringify(minerInfo)
  })
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
  request(`/miner/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(minerInfo)
  })
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
  request(`/status/miners`, {
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
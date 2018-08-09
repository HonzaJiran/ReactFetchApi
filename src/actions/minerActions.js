import {
  FETCH_MINERS,
  ADD_MINER,
  EDIT_MINER,
  MINER_ACTION,
  DELETE_MINER,
  GET_CURRENT_MINER,
  FETCH_MINER_STATUS
} from './types'

import Alert from 'react-s-alert';

import { request } from './../request'

export const fetchMiners = () => dispatch => {
  request(`/miner/`)
  .then(miners => dispatch({
    type: FETCH_MINERS,
    payload: miners
  }))
  .catch(error => {
    console.log(error);
  })
}

export const fetchMinerStatus = () => dispatch => {
  request(`/status/miners`)
  .then(status => dispatch({
    type: FETCH_MINER_STATUS,
    payload: status
  }))
  .catch(error => console.log(error))
}

export const addMiner = minerInfo => dispatch => {
  request(`/miner/add/`, 'POST', JSON.stringify(minerInfo))
  .then(miner => dispatch({
    type: ADD_MINER,
    payload: miner
  }))
  .then(response => {
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

export const editMiner = (id,minerInfo) => dispatch => {
  request(`/miner/${id}/`, 'PATCH', minerInfo)
  .then(response => {
    Alert.success(`Miner edited.`, {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 'none'
    });
  })
  .then(miner => dispatch({
    type: EDIT_MINER,
    payload: miner
  }))
}

export const minerAction = actionInfo => dispatch => {
  request(`/miner/action/`, 'GET', null, actionInfo)
  .then(minerAction => dispatch({
    type: MINER_ACTION,
    payload: minerAction
  }))
  .then(response => {
    if (response.ok) {
      Alert.success(`Action sended.`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    }else{
      Alert.warning(`Something went wrong..`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    }
  })
}

export const getCurrentMiner = id => dispatch => {
  request(`/miner/${id}/`, 'GET')
  .then(currentMiner => dispatch({
    type: GET_CURRENT_MINER,
    payload: currentMiner
  }))
}

export const deleteMiner = id => dispatch => {
  console.log('delete (DUMP)');
}
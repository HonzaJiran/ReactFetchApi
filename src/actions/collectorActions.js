import {FETCH_COLLECTORS, ADD_NEW_MINER, SCAN_MINERS} from './types'
import Alert from 'react-s-alert';

import { request } from '../request'

export const fetchCollectors = () => dispatch => {
  request(`/collector/`)
  .then(collectors => dispatch({
    type: FETCH_COLLECTORS,
    payload: collectors
  }))
}

export const addNewMinerToCollector = minerInfo => dispatch => {
  request(`/miner/add/`, 'POST', JSON.stringify(minerInfo))
  .then(addedMiner => dispatch({
    type: ADD_NEW_MINER,
    payload: addedMiner
  }))
  .then(response => {
    Alert.success(`Miner "${response.payload.miner_name}" Added`, {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 'none'
    });
  })
  .catch(error =>{
    Alert.error(`${error}`, {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 'none'
    });
  })
}

export const scanMiners = scanInfo => dispatch => {
  request(`/collector/refresh/`, 'GET', null, scanInfo)
  .then(scan => dispatch({
    type: SCAN_MINERS,
    payload: scan
  }))
  .catch(error => {
    console.log(error);
  })
}
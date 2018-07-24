import {FETCH_COLLECTORS, ADD_NEW_MINER, SCAN_MINERS} from './types'
import Alert from 'react-s-alert';

export const fetchCollectors = () => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/collector/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(res => res.json())
    .then(collectors => dispatch({
      type: FETCH_COLLECTORS,
      payload: collectors
    }))
    .catch(error => {
      console.log(error);
    })
}

export const addNewMinerToCollector = minerInfo => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/miner/add/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(minerInfo)
    })
    .then(res => res.json())
    .then(response => dispatch({
      type: ADD_NEW_MINER,
      item: response
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
  fetch('https://monpick.thinkeasy.cz/api/v1/collector/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(scanInfo)
    })
    .then(res => res.json())
    .then(scan => dispatch({
      type: SCAN_MINERS,
      payload: scan
    }))
    .then(scan => {
      Alert.success(`${scan.payload.detail}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
    .catch(error => {
      console.log(error);
      Alert.error(`${error}`, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })
}
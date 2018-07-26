import { FETCH_GPUS, EDIT_GPU, SINGLE_GPU } from './types'
import Alert from 'react-s-alert';

import { request } from './../request'

export const fetchGpus = () => dispatch => {
  request(`/status/graphiccards/`)
  .then( graphicCards => dispatch({
    type: FETCH_GPUS,
    payload: graphicCards
  }))
  .catch( error => {
    console.log(error);
  })
}

export const editGpu = (graphicCardInfo, id) => dispatch => {
  request(`/graphiccard/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(graphicCardInfo)
  })
  .then( editGpu => dispatch({
    type: EDIT_GPU,
    payload: editGpu
  }))
  .then( response =>
    Alert.success(`Name: ${response.payload.name + ' , Is-disabled: ' + response.payload.is_disabled}`, {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 'none'
    })
  )
  .catch( error => {
    console.log(error);
  })
}

export const getSingleGpu = id => dispatch => {
  request(`/graphiccard/${id}`)
  .then( graphiccard => dispatch({
    type: SINGLE_GPU,
    payload: graphiccard
  }))
}
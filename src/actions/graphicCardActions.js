import {FETCH_GPUS, EDIT_GPU} from './types'
import Alert from 'react-s-alert';

export const fetchGpus = () => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api/v1/status/graphiccards', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then( res => res.json())
    .then( graphicCards => dispatch({
      type: FETCH_GPUS,
      payload: graphicCards
    }))
    .catch( error => {
      console.log(error);
    })
}

export const editGpu = (graphicCardInfo, id) => dispatch => {
  fetch(`https://monpick.thinkeasy.cz/api/v1/graphiccard/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'JWT ' + sessionStorage.getItem('jwtToken')
      },
      body: JSON.stringify(graphicCardInfo)
    })
    .then( res => res.json())
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
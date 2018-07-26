import { store } from './store'
import { logOutUser, refreshAction } from './actions/loginActions'

export const request = (url, method='GET', body=null, headers={}) => {
  return(
    fetch(`https://monpick.thinkeasy.cz/api/v1${url}`, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + store.getState().login,
        ...headers
      }
    })
    .then(response => {
      if(response.status == 401){
        store.dispatch(logOutUser())
        throw 'Unauthorized'
      }
      if(!response.ok){
        throw 'Other problem'
      }
      return response;
    })
    .then(res=>{
      store.dispatch(refreshAction(store.getState().login))
      return res;
    })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  )
}
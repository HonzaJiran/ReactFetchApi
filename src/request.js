import { store } from './store'
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
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  )
}
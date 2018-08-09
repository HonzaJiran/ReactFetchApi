import { store } from './store'
import { logOutUser, refreshAction } from './actions/loginActions'

export const request = (url, method='GET', body=null, parameters=null) => {
    return(
    fetch(`https://monpick.thinkeasy.cz/api/v1${url}${createQueryString(parameters)}`, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + store.getState().login,
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
      window.location.reload();
    })
  )
}

const createQueryString = (queryObject) => {
  if(!queryObject){
    return '';
  }
  let queryString = '?'
  let isFirst = true;

  for (var key in queryObject) {
    if (!queryObject.hasOwnProperty(key)) continue;

    var queryValue = queryObject[key];

    if(!isFirst){
      queryString+='&'
    }
    queryString+=`${key}=${queryValue}`
    isFirst=false;
  }

  return queryString;
}

import { AUTH_USER, LOGOUT_USER } from './types'
import axios from 'axios'
import { request } from '../request';

const authReceived = (token) => ({
  type: AUTH_USER,
  payload: token
})

export const authUser = (userName, userPassword) => dispatch => {
  axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: userName,
      password: userPassword
    })
    .then(token => dispatch(authReceived(token.data.token)))
    .catch(error => {
      console.log(error);      
    })
}

export const logOutUser = () => ({
  type: LOGOUT_USER
})

export const refreshAction = (token) => dispatch => {
  fetch('https://monpick.thinkeasy.cz/api-token-refresh/', {
      method: 'POST',
      body: JSON.stringify({token: token}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response=>{
      if(response.ok){
        return response;
      }
      throw 'refresh failed';
    })
    .then(res=>res.json())
    .then(response => dispatch(authReceived(response.token)))
    .catch(e=>console.log(e))
}
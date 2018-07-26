import { AUTH_USER } from './types'
import axios from 'axios'

export const authUser = (userName, userPassword) => dispatch => {
  axios.post(`https://monpick.thinkeasy.cz/api-auth/`, {
      username: userName,
      password: userPassword
    })
    .then(token => dispatch({
      type: AUTH_USER,
      payload: token
    }))
    .catch(error => {
      console.log(error);
    })
}
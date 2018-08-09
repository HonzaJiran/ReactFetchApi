import { AUTH_USER, LOGOUT_USER } from '../actions/types'

const initialState = '';

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;

    case LOGOUT_USER:
      return initialState;
  
    default:
      return state;
  }
}
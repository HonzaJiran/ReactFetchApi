import {SHOW_ALL} from '../actions/types'

const initialState = {
  show_all: 'hide'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALL:
      return{
        ...state,
        show_all: action.payload
      };
  
    default:
      return state;
  }
}
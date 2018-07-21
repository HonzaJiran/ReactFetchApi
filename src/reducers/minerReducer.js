import {FETCH_MINERS, ADD_MINER} from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MINERS:
      return{
        ...state,
        items: action.payload
      };
    
    case ADD_MINER:
      return{
        ...state,
        item: action.payload
      };
  
    default:
      return state;
  }
}
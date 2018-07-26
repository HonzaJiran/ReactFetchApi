import {FETCH_MINERS, ADD_MINER, EDIT_MINER, MINER_ACTION} from '../actions/types'

const initialState = {
  items: [],
  item: {},
  edited: {},
  miner_action: {}
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
    
    case EDIT_MINER:
      return{
        ...state,
        edited: action.payload
      };

    case MINER_ACTION:
      return{
        ...state,
        miner_action: action.payload
      }
  
    default:
      return state;
  }
}
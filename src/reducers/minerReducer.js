import {FETCH_MINERS, ADD_MINER, EDIT_MINER, MINER_ACTION, DELETE_MINER, GET_CURRENT_MINER, FETCH_MINER_STATUS } from '../actions/types'

const initialState = {
  items: [],
  item: {},
  minerStatuses: [],
  edited: {},
  miner_action: {},
  deleted: {},
  currentMiner: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MINERS:
      return{
        ...state,
        items: action.payload
      };

    case FETCH_MINER_STATUS:
      return{
        ...state,
        minerStatuses: action.payload
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

    case DELETE_MINER:
      return{
        ...state,
        deleted: action.payload
      };

    case GET_CURRENT_MINER:
      return{
        ...state,
        currentMiner: action.payload
      };
  
    default:
      return state;
  }
}
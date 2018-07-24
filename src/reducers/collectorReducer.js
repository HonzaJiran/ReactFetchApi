import {FETCH_COLLECTORS, ADD_NEW_MINER, SCAN_MINERS} from '../actions/types'

const initialState = {
  items: [],
  item: {},
  scan: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTORS:
      return{
        ...state,
        items: action.payload
      };
      
    case ADD_NEW_MINER:
      return{
        ...state,
        item: action.payload
      };

    case SCAN_MINERS:
      return{
        ...state,
        scan: action.payload
      }

    default:
      return state;
  }
}
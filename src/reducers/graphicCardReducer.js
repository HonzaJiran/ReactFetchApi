import {FETCH_GPUS, EDIT_GPU, SINGLE_GPU} from '../actions/types'

const initialState = {
  items: [],
  item: {},
  singleGpu: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GPUS:
      return{
        ...state,
        items: action.payload
      };
    
    case EDIT_GPU:
      return{
        ...state,
        item: action.payload
      };

    case SINGLE_GPU:
    return{
      ...state,
      singleGpu: action.payload
    }
  
    default:
      return state;
  }
}
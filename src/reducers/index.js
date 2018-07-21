import {combineReducers} from 'redux'

import minerReducer from './minerReducer'

export default combineReducers({
  miners: minerReducer
})
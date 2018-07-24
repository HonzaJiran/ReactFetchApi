import {combineReducers} from 'redux'

import minerReducer from './minerReducer'
import graphicCardReducer from './graphicCardReducer';
import globalReducer from './globalReducer'
import collectorReducer from './collectorReducer'

export default combineReducers({
  miners: minerReducer,
  graphicCards: graphicCardReducer,
  global: globalReducer,
  collectors: collectorReducer
})
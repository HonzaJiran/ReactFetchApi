import {combineReducers} from 'redux'

import minerReducer from './minerReducer'
import graphicCardReducer from './graphicCardReducer';
import globalReducer from './globalReducer'
import collectorReducer from './collectorReducer'
import eventReducer from './eventReducer'

export default combineReducers({
  miners: minerReducer,
  graphicCards: graphicCardReducer,
  global: globalReducer,
  collectors: collectorReducer,
  events: eventReducer
})
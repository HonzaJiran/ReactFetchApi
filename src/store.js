import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import thunk from 'redux-thunk'

import rootReducer from './reducers'

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [thunk]

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default {
  store: store,
  persistor: persistStore(store),
}

export const persistor = persistStore(store);
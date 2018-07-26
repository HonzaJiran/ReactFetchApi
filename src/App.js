import React, { Component } from 'react'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import ErrorBoundary from './ErrorBoundary'
import RoutingPage from './pages/routingPage';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutingPage/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
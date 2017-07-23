import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import reducer from '../reducers'

import * as actionCreators from '../actions/todo'

export let isMonitorAction

export default function configureStore(preloadState) {
  const composeEnchancers = composeWithDevTools({ actionCreators })
  const store = createStore(reducer, preloadState, composeEnchancers(
    applyMiddleware(invariant(), thunk)
  ))


if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers')
    store.replaceReducer(nextReducer)
  })
}
  return store
}

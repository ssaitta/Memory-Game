import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import board from './board'
import chosenCards from './chosenCards'
import difficulty from './difficulty'
import timer from './timer'
import status from './status'

const reducer = combineReducers({
  board,
  chosenCards,
  difficulty,
  timer,
  status,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store
export * from './board'
export * from './chosenCards'
export * from './difficulty'
export * from './timer'
export * from './status'

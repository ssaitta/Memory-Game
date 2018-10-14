import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import board from './board'
import chosenCards from './chosenCards'
import difficulty from './difficulty'
import status from './status'
import timer from './timer'

const reducer = combineReducers({
  board,
  chosenCards,
  difficulty,
  timer,
  status,
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
export { resetCards, getCards, fetchCards, flipCard, matchedCards } from './board'
export { chooseCard, disableCards, resetChoices } from './chosenCards'
export { setDifficulty } from './difficulty'
export { updateStatus } from './status'
export { resetTime, pauseTime, incrementTime } from './timer'

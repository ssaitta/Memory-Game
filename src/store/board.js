import axios from 'axios'

import { shuffle, buildCardArray, toggleHide, toggleMatched } from './helper'

const GET_CARDS = 'GET_CARDS'
const FLIP_CARD = 'FLIP_CARD'
const RESET_CARDS = 'RESET_CARDS'
const MATCHED_CARDS = 'MATCHED_CARDS'

export const resetCards = cards => ({
  type: RESET_CARDS,
  cards,
})

export const getCards = (cards, difficulty) => {
  const newCards = buildCardArray(cards, difficulty)
  return {
    type: GET_CARDS,
    cards: newCards,
  }
}

export const fetchCards = difficulty => dispatch =>
  axios
    .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
    .then(res => dispatch(getCards(res.data, difficulty)))
    .catch(err => console.log(err))

export const flipCard = card => ({
  type: FLIP_CARD,
  card,
})

export const matchedCards = cards => ({
  type: MATCHED_CARDS,
  cards,
})

const initalState = []

const board = function(state = initalState, action) {
  switch (action.type) {
    case GET_CARDS:
      return [...action.cards]
    case FLIP_CARD:
      return toggleHide(action.card, state.slice())
    case RESET_CARDS:
      action.cards.forEach(card => {
        card.hidden = true
        card.matched = false
      })
      return [...shuffle(action.cards)]
    case MATCHED_CARDS:
      return toggleMatched(action.cards, state.slice())
    default:
      return state
  }
}

export default board

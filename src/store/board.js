/* eslint-disable prefer-template, max-len */
import axios from 'axios'

const GET_CARDS = 'GET_CARDS'
const FLIP_CARD = 'FLIP_CARD'

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const replaceCard = (card, cardArray) => {
  let index
  const updateCard = cardArray.find((elem, ind) => {
    if (elem.row === card.row && elem.column === card.column) {
      index = ind
      return elem
    }
  })
  updateCard.hidden = !updateCard.hidden
  cardArray.splice(index, 1, updateCard)
  return cardArray
}

export const getCards = (cards, difficulty) => {
  let level = cards.levels.find(e => e.difficulty === difficulty)
  level = shuffle(level.cards)
  const cardsArray = []
  let counter = 0
  let rowCounter = 0

  level.map((card, ind) => {
    if (rowCounter >= 4) {
      counter += 1
      rowCounter = 0
    }
    cardsArray.push({
      value: card,
      row: counter,
      column: ind % 4,
      hidden: true,
    })
    rowCounter += 1
  })

  return {
    type: GET_CARDS,
    cards: cardsArray,
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

const initalState = []

const board = function(state = initalState, action) {
  switch (action.type) {
    case GET_CARDS:
      state = [...action.cards]
      return state
    case FLIP_CARD:
      return replaceCard(action.card, state)
    default:
      return state
  }
}

export default board

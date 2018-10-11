import axios from 'axios'

const defaultCards = []

const SET_BOARD = 'SET_BOARD'
const GET_CARDS = 'GET_CARDS'
const SET_DIFFICULTY = 'SET_DIFFICULTY'

export const setBoard = () => ({ type: SET_BOARD })
export const getCards = (cards) => {
    return ({
        type: GET_CARDS, 
        cards: cards.levels[0] 
    })
}
export const setDifficulty = (difficulty) => ({
    type: SET_DIFFICULTY,
    difficulty: difficulty  
})


export const fetchCards = () => 
    dispatch => 
        axios
        .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
        .then(res => dispatch(getCards(res.data)))
        .catch(err => console.log(err))

let shuffledDeck = shuffle(['A', 'B', 'C', 'A', 'B', 'C'])


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

const initalState = [
  [[shuffledDeck[0], shuffledDeck[1], shuffledDeck[2]]],
  [[shuffledDeck[3], shuffledDeck[4], shuffledDeck[5]]],
]

const board = function(state = initalState, action) {
  switch (action.type) {
    case SET_BOARD:
      shuffledDeck = shuffle(['A', 'B', 'C', 'A', 'B', 'C'])
      return state
    case GET_CARDS:
      state = [...state, action.cards]
      return state
    case SET_DIFFICULTY:
      shuffledDeck = shuffle(['A', 'B', 'C', 'A', 'B', 'C'])
      return state
    default:
      return state
  }
}

export default board
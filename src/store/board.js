import axios from 'axios'

const defaultCards = []

const GET_CARDS = 'GET_CARDS'

export const getCards = (cards, difficulty) => {
    let level = cards.levels.find(e => e.difficulty === difficulty )
    level = shuffle(level.cards)
    let cardsArray = []
    let counter = 0
    let rowCounter = 0

    level.map((card, ind) => {
        if(rowCounter>=4){
            counter++
            rowCounter = 0
        }
        cardsArray.push({
            value: card,
            row: counter,
            column: ind%4,
        })
        rowCounter++
    })
    
    return ({
        type: GET_CARDS,
        cards: cardsArray
    })
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i] 
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export const fetchCards = (difficulty) => 
    dispatch => 
        axios
            .get('https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json')
            .then(res => dispatch(getCards(res.data, difficulty)))
            .catch(err => console.log(err))

const initalState = []

const board = function(state = initalState, action) {
  switch (action.type) {
    case GET_CARDS:
        state = [...action.cards]
        return state
    default:
        return state
}
}

export default board
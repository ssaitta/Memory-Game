const CHOOSE_CARD = 'CHOOSE_CARD'
const RESET_CHOICES = 'RESET_CHOICES'
const DISABLE_CARDS = 'DISABLE_CARDS'

export const chooseCard = (card, turn) => ({
  type: CHOOSE_CARD,
  card,
  turn,
})

export const disableCards = cards => ({
  type: DISABLE_CARDS,
  cards,
})

export const resetChoices = () => ({ type: RESET_CHOICES })

const intialState = { card1: null, card2: null }

const chosenCards = function(state = intialState, action) {
  switch (action.type) {
    case CHOOSE_CARD:
      if (action.turn === 1) {
        return Object.assign({}, state, {
          card1: Object.assign({}, action.card, { hidden: false }),
        })
      }
      return Object.assign({}, state, {
        card2: Object.assign({}, action.card, { hidden: false }),
      })
    case DISABLE_CARDS:
      return Object.assign(
        {},
        state,
        { card1: Object.assign({}, action.cards.card1, { matched: true }) },
        { card2: Object.assign({}, action.cards.card2, { matched: true }) }
      )
    case RESET_CHOICES:
      return { card1: null, card2: null }
    default:
      return state
  }
}

export default chosenCards

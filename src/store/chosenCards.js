import {} from './helper'

const CHOOSE_CARD_1 = 'CHOOSE_CARD_1'
const CHOOSE_CARD_2 = 'CHOOSE_CARD_2'
const RESET_CHOICES = 'RESET_CHOICES'
const DISABLE_CARD1 = 'DISABLE_CARD'
const DISABLE_CARD2 = 'DISABLE_CARD'
// const PICK_CARD = 'PICK_CARD'

export const chooseCard1 = card => ({
  type: CHOOSE_CARD_1,
  card,
})

export const chooseCard2 = card => ({
  type: CHOOSE_CARD_2,
  card,
})

export const disableCard1 = card => ({
  type: DISABLE_CARD1,
  card,
})

export const disableCard2 = card => ({
  type: DISABLE_CARD2,
  card,
})

// export const pickCard = card => ({
//   type: PICK_CARD,
//   card,
//   hidden: false,
// })

export const resetChoices = () => ({ type: RESET_CHOICES })

const intialState = { card1: null, card2: null }

const chosenCards = function(state = intialState, action) {
  switch (action.type) {
    case CHOOSE_CARD_1:
      return Object.assign({}, state, { card1: Object.assign({}, action.card, { hidden: false }) })
    case CHOOSE_CARD_2:
      return Object.assign({}, state, { card2: Object.assign({}, action.card, { hidden: false }) })
    case DISABLE_CARD1:
      return Object.assign({}, state, { card1: Object.assign({}, action.card, { matched: false }) })
    case DISABLE_CARD2:
      return Object.assign({}, state, { card2: Object.assign({}, action.card, { matched: false }) })
    // case PICK_CARD:
    //   return Object.assign(state, { card1: action.card })
    case RESET_CHOICES:
      return { card1: null, card2: null }
    default:
      return state
  }
}

export default chosenCards

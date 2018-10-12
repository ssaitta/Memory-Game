const CHOOSE_CARD_1 = "CHOOSE_CARD_1"
const CHOOSE_CARD_2 = "CHOOSE_CARD_2"
const RESET_CHOICES = "RESET_CHOICES"

export const chooseCard1 = (card) => ({
    type: CHOOSE_CARD_1, 
    card: card,
})

export const chooseCard2 = (card) => ({
    type: CHOOSE_CARD_2, 
    card: card,
})

export const resetChoices = () => ({type: RESET_CHOICES})

const intialState = {card1: null, card2: null}

const chosenCards = function(state = intialState, action){
    switch(action.type){
        case(CHOOSE_CARD_1):
            return Object.assign(state, {card1: {card: action.card}})
        case(CHOOSE_CARD_2):
            return Object.assign(state, {card2: {card: action.card}})
        case RESET_CHOICES:
            return {card1: null, card2: null}
        default:
            return state
    }
}

export default chosenCards
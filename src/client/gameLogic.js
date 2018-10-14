export const checkCards = chosenCards => {
  if (
    chosenCards.card1 &&
    chosenCards.card2 &&
    chosenCards.card1.value === chosenCards.card2.value
  ) {
    return true
  }
  return false
}

export const checkBoard = board => board.every(card => card.matched === true)

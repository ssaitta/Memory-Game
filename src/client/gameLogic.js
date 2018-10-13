export const checkCards = function(chosenCards) {
  if (
    chosenCards.card1 &&
    chosenCards.card2 &&
    chosenCards.card1.value === chosenCards.card2.value
  ) {
    return true
  }
  return false
}

// const newStatus = chosenCards => {
//   const win = check(chosenCards)
//   return win || 'In Progress'
// }

// export default newStatus

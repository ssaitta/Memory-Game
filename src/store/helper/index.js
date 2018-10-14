const findCard = (currentCard, cardArray) => {
  let index = null
  cardArray.forEach((card, ind) => {
    if (currentCard.row === card.row && currentCard.column === card.column) {
      index = ind
    }
  })
  return index
}

export const toggleHide = (card, cardArray) => {
  const index = findCard(card, cardArray)
  const newCard = Object.assign({}, card, { hidden: !card.hidden })
  return [].concat(cardArray.slice(0, index), newCard, cardArray.slice(index + 1))
}

export const toggleMatched = (cards, cardArray) => {
  const index1 = findCard(cards.card1, cardArray)
  const index2 = findCard(cards.card2, cardArray)
  const newCard1 = Object.assign({}, cards.card1, { matched: !cards.card1.matched })
  const newCard2 = Object.assign({}, cards.card2, { matched: !cards.card2.matched })
  const newArray = [].concat(cardArray.slice(0, index1), newCard1, cardArray.slice(index1 + 1))
  return [].concat(newArray.slice(0, index2), newCard2, newArray.slice(index2 + 1))
}

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const buildCardArray = (cards, difficulty) => {
  let level = cards.levels.find(e => e.difficulty === difficulty)
  level = shuffle(level.cards)
  let counter = 0
  let rowCounter = 0
  const cardsArray = level.map((card, ind) => {
    if (rowCounter >= 4) {
      counter += 1
      rowCounter = 0
    }
    const newCard = {
      value: card,
      row: counter,
      column: ind % 4,
      hidden: true,
      matched: false,
    }
    rowCounter += 1
    return newCard
  })
  return cardsArray
}

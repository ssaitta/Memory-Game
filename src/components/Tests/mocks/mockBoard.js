export const mockWinningGame = [
  { value: '♘', row: 0, column: 0, hidden: false, matched: true },
  { value: '✈', row: 0, column: 1, hidden: false, matched: true },
  { value: '☆', row: 0, column: 2, hidden: false, matched: true },
  { value: '♘', row: 0, column: 3, hidden: false, matched: true },
  { value: '♫', row: 1, column: 0, hidden: false, matched: true },
  { value: '♫', row: 1, column: 1, hidden: false, matched: true },
  { value: '✈', row: 1, column: 2, hidden: false, matched: true },
  { value: '☆', row: 1, column: 3, hidden: false, matched: true },
]

export const mockGameInProgress = [
  { value: '♘', row: 0, column: 0, hidden: true, matched: false },
  { value: '✈', row: 0, column: 1, hidden: true, matched: false },
  { value: '☆', row: 0, column: 2, hidden: true, matched: false },
  { value: '♘', row: 0, column: 3, hidden: true, matched: false },
  { value: '♫', row: 1, column: 0, hidden: true, matched: false },
  { value: '♫', row: 1, column: 1, hidden: true, matched: false },
  { value: '✈', row: 1, column: 2, hidden: true, matched: false },
  { value: '☆', row: 1, column: 3, hidden: true, matched: false },
]

export const mockChosenCardsMatch = {
  card1: { value: '♫', row: 1, column: 0, hidden: false, matched: false },
  card2: { value: '♫', row: 1, column: 1, hidden: false, matched: false },
}

export const mockChosenCardsDontMatch = {
  card1: { value: '♫', row: 1, column: 0, hidden: false, matched: false },
  card2: { value: '✈', row: 1, column: 1, hidden: false, matched: false },
}

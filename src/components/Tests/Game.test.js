import { checkCards, checkBoard } from '../../client/gameLogic'
import {
  mockWinningGame,
  mockGameInProgress,
  mockChosenCardsMatch,
  mockChosenCardsDontMatch,
} from './mocks/mockBoard'

test('Test checkBoard winning game', () => {
  expect(checkBoard(mockWinningGame)).toBe(true)
})

test('Test checkBoard for "In Progress" game', () => {
  expect(checkBoard(mockGameInProgress)).toBe(false)
})

test('Test checking if cards match', () => {
  expect(checkCards(mockChosenCardsMatch)).toBe(true)
})

test("Test checking if cards don't match", () => {
  expect(checkCards(mockChosenCardsDontMatch)).toBe(false)
})

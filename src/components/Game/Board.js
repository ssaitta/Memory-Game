import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  fetchCards,
  resetChoices,
  matchedCards,
  chooseCard,
  flipCard,
  disableCards,
  updateStatus,
  pauseTime,
} from '../../store'
import CardRow from './CardRow'
import ResetButton from '../Buttons/ResetButton'
import { checkCards, checkBoard } from '../../client/gameLogic'
import styles from '../Styles/Game.scss'

const mapStateToProps = state => ({
  board: state.board,
  difficulty: state.difficulty,
  chosenCards: state.chosenCards,
  status: state.status,
  timer: state.timer,
})

const mapDispatchToProps = dispatch => ({
  newBoard(difficulty) {
    dispatch(fetchCards(difficulty))
  },
  resetChosen() {
    dispatch(resetChoices())
  },
  matchedCard(cards) {
    dispatch(matchedCards(cards))
  },
  pickCard(card, turn) {
    dispatch(chooseCard(card, turn))
  },
  disableCard(cards) {
    dispatch(disableCards(cards))
  },
  flip(card) {
    dispatch(flipCard(card))
  },
  updateStatusWon() {
    dispatch(updateStatus('Won'))
  },
  togglePause(bool) {
    dispatch(pauseTime(bool))
  },
})

const layoutCards = (cardArray, difficulty) => {
  const layout = []
  if (cardArray) {
    const numOfRows = difficulty === 'easy' ? 2 : 4
    let pnt = 0
    for (let i = 0; i < numOfRows; i += 1) {
      layout[i] = []
      for (let j = 0; j < 4; j += 1) {
        layout[i].push(cardArray[pnt])
        pnt += 1
      }
    }
  }
  return layout
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.cardClick = this.cardClick.bind(this)
    this.pauseAndFlip = this.pauseAndFlip.bind(this)
  }

  componentDidMount() {
    const { difficulty, newBoard } = this.props
    newBoard(difficulty)
  }

  componentDidUpdate(prevProps) {
    const { newBoard, resetChosen, togglePause, updateStatusWon, board, difficulty } = this.props
    if (difficulty !== prevProps.difficulty) {
      newBoard(difficulty)
      resetChosen()
    }
    if (board !== prevProps.board) {
      if (checkBoard(board)) {
        togglePause(true)
        updateStatusWon()
      }
    }
  }

  pauseAndFlip() {
    const { flip, resetChosen, disableCard, chosenCards, matchedCard } = this.props
    if (checkCards(chosenCards)) {
      matchedCard(chosenCards)
      disableCard(chosenCards)
      resetChosen()
    } else {
      flip(chosenCards.card1)
      flip(chosenCards.card2)
      resetChosen()
    }
  }

  cardClick(e, card) {
    e.preventDefault()
    const { card1, card2 } = this.props.chosenCards
    const { pickCard, flip, timer, togglePause } = this.props
    if (timer.pause) {
      togglePause(false)
    }
    if (!card1) {
      pickCard(card, 1)
      flip(card)
    } else if (!card2) {
      if (card.row !== card1.row || card.column !== card1.column) {
        pickCard(card, 2)
        flip(card)
        this.pause = setTimeout(this.pauseAndFlip, 700)
      }
    }
  }

  render() {
    const { board, difficulty, status } = this.props
    const layout = layoutCards(board, difficulty)
    if (status === 'In Progress') {
      return (
        <div>
          {board && (
            <div>
              {layout.map((cardRow, ind) => (
                <CardRow
                  cardClick={this.cardClick}
                  key={ind}
                  gameLevel={difficulty}
                  cardRow={cardRow}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className={styles.winningContainer}>
        <h1 className={styles.winnerText}>You won!</h1>
        <ResetButton />
      </div>
    )
  }
}

Board.propTypes = {
  board: PropTypes.instanceOf(Array).isRequired,
  difficulty: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  chosenCards: PropTypes.instanceOf(Object).isRequired,
  timer: PropTypes.instanceOf(Object).isRequired,
  newBoard: PropTypes.func.isRequired,
  resetChosen: PropTypes.func.isRequired,
  pickCard: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  matchedCard: PropTypes.func.isRequired,
  disableCard: PropTypes.func.isRequired,
  updateStatusWon: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)

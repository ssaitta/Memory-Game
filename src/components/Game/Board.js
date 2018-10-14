import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Confetti from 'react-confetti'

import {
  fetchCards,
  setDifficulty,
  resetChoices,
  matchedCards,
  chooseCard1,
  chooseCard2,
  flipCard,
  disableCard1,
  disableCard2,
  updateStatus,
  pauseTime,
} from '../../store'
import CardRow from './CardRow'
import { checkCards, checkBoard } from '../../client/gameLogic'

const mapStateToProps = state => ({
  board: state.board,
  difficulty: state.difficulty,
  chosenCards: state.chosenCards,
  status: state.status,
  timer: state.timer,
})

const mapDispatchToProps = dispatch => ({
  updateDifficulty(difficulty) {
    dispatch(setDifficulty(difficulty))
  },
  newBoard(difficulty) {
    dispatch(fetchCards(difficulty))
  },
  resetChosen() {
    dispatch(resetChoices())
  },
  matchedCard(card) {
    dispatch(matchedCards(card))
  },
  pickCard(card, turn) {
    if (turn === 1) {
      dispatch(chooseCard1(card))
    } else {
      dispatch(chooseCard2(card))
    }
  },
  disableCard(card, turn) {
    if (turn === 1) {
      dispatch(disableCard1(card))
    } else {
      dispatch(disableCard2(card))
    }
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
    const { updateDifficulty, newBoard } = this.props
    updateDifficulty('easy')
    newBoard(this.props.difficulty)
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
    const { card1, card2 } = this.props.chosenCards
    const { flip, resetChosen, disableCard, chosenCards, matchedCard } = this.props
    if (checkCards(chosenCards)) {
      matchedCard(card1)
      matchedCard(card2)
      disableCard(card1, 1)
      disableCard(card2, 2)
      resetChosen()
    } else {
      flip(card1)
      flip(card2)
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
                <CardRow cardClick={this.cardClick} key={ind} cardRow={cardRow} />
              ))}
            </div>
          )}
        </div>
      )
    }
    return (
      <div>
        <Confetti height={'100vh'} width={'100vw'} recycle={false} />
        <span>YOU WINN!!!</span>
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
  updateDifficulty: PropTypes.func.isRequired,
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

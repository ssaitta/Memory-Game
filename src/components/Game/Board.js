import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  fetchCards,
  setDifficulty,
  resetChoices,
  matchedCards,
  chooseCard1,
  chooseCard2,
  flipCard,
  resetCards,
} from '../../store'
import CardRow from './CardRow'
import { checkCards } from '../../client/gameLogic'

const mapStateToProps = state => ({
  board: state.board,
  difficulty: state.difficulty,
  chosenCards: state.chosenCards,
})

const mapDispatchToProps = dispatch => ({
  setDifficulty(difficulty) {
    dispatch(setDifficulty(difficulty))
  },
  newBoard(difficulty) {
    dispatch(fetchCards(difficulty))
  },
  resetChoices() {
    dispatch(resetChoices())
  },
  matchedCards(card) {
    dispatch(matchedCards(card))
  },
  pickCard(card, turn) {
    if (turn === 1) {
      dispatch(chooseCard1(card))
    } else {
      dispatch(chooseCard2(card))
    }
  },
  flip(card) {
    dispatch(flipCard(card))
  },
  resetCards() {
    dispatch(resetCards())
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
    this.props.setDifficulty('easy')
    this.props.newBoard(this.props.difficulty)
  }

  componentDidUpdate(prevProps) {
    const { card1, card2 } = this.props.chosenCards
    let { flip, resetChoices, matchedCards, chosenCards } = this.props
    if (this.props.difficulty !== prevProps.difficulty) {
      this.props.newBoard(this.props.difficulty)
      this.props.resetChoices()
    }

    // if (this.props.chosenCards !== prevProps.chosenCards) {
    //   if (checkCards(chosenCards)) {
    //     matchedCards(card1)
    //     matchedCards(card2)
    //   }
    // }
  }

  pauseAndFlip() {
    const { card1, card2 } = this.props.chosenCards
    let { flip, resetChoices, matchedCards, chosenCards } = this.props
    console.log('Pause and Flip ')
    if (checkCards(chosenCards)) {
      matchedCards(card1)
      matchedCards(card2)
    }
    //   resetChoices()
    // } else {
    //   flip(card1)
    //   flip(card2)
    //   resetChoices()
    // }
  }

  cardClick(e, card) {
    e.preventDefault()
    const { card1, card2 } = this.props.chosenCards
    const { pickCard, flip, board } = this.props
    if (!card1) {
      pickCard(card, 1)
      flip(card)
    } else if (!card2) {
      if (card.row !== card1.row || card.column !== card1.column) {
        pickCard(card, 2)
        flip(card)
      }
    }
    // else if (card1 && card2) {
    //   flip(card1)
    //   flip(card2)
    //   if (checkCards(this.props.chosenCards)) {
    //     this.props.matchedCards(card1)
    //     this.props.matchedCards(card2)
    //   }
    //   console.log("This", this)

    //   pickCard(card, 1)
    //   flip(card)
    // }
  }

  render() {
    const { board, difficulty } = this.props
    const { card1, card2 } = this.props.chosenCards
    const layout = layoutCards(board, difficulty)
    if (card1 && card2) {
      this.pause = setTimeout(this.pauseAndFlip, 750)
    }
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
}

Board.propTypes = {
  board: PropTypes.instanceOf(Array).isRequired,
  difficulty: PropTypes.string.isRequired,
  chosenCards: PropTypes.instanceOf(Object).isRequired,
  setDifficulty: PropTypes.func.isRequired,
  newBoard: PropTypes.func.isRequired,
  resetChoices: PropTypes.func.isRequired,
  pickCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  matchedCards: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)

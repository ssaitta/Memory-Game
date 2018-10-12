import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../Game/Game.scss'
import { chooseCard1, chooseCard2, resetChoices, flipCard } from '../../store'

const mapStateToProps = state => ({
  chosenCards: state.chosenCards,
})

const mapDisptchToProps = dispatch => ({
  pickCard(card, turn) {
    if (turn === 1) {
      dispatch(chooseCard1(card))
    } else {
      dispatch(chooseCard2(card))
    }
  },
  resetCards() {
    dispatch(resetChoices())
  },
  flip(card) {
    dispatch(flipCard(card))
  },
})

class Card extends Component {
  onClick(e, card) {
    const { card1, card2 } = this.props.chosenCards
    const { pickCard, flip } = this.props
    e.preventDefault()
    if (!card1) {
      pickCard(card, 1)
      flip(card)
    } else if (!card2) {
      if (card.row !== card1.row || card.column !== card1.column) {
        pickCard(card, 2)
        flip(card)
      }
    } else if (card1 && card2) {
      flip(card1)
      flip(card2)
      this.props.resetCards()
      pickCard(card, 1)
      flip(card)
    }
  }
  render() {
    const { card } = this.props
    let classes = []
    if (card && card.hidden) {
      classes = [styles.card, styles.backOfCard]
    } else {
      classes = [styles.card]
    }
    return (
      <div>
        {card && (
          <button className={classes.join(' ')} onClick={e => this.onClick(e, card)}>
            <span className={styles.innerCard}>{card.value}</span>
          </button>
        )}
      </div>
    )
  }
}

Card.propTypes = {
  chosenCards: PropTypes.instanceOf(Object).isRequired,
  card: PropTypes.instanceOf(Object),
  pickCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDisptchToProps)(Card)

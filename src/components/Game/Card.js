import React, { Component } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../Game/Game.scss'
// import { chooseCard1, chooseCard2, resetChoices, flipCard, matchedCards } from '../../store'
// import { checkCards } from '../../client/gameLogic'

// const mapStateToProps = state => ({
// //   chosenCards: state.chosenCards,
//   board: state.board,
// })

// const mapDisptchToProps = dispatch => ({
//   pickCard(card, turn) {
//     if (turn === 1) {
//       dispatch(chooseCard1(card))
//     } else {
//       dispatch(chooseCard2(card))
//     }
//   },
//   resetCards() {
//     dispatch(resetChoices())
//   },
//   flip(card) {
//     dispatch(flipCard(card))
//   },
//   matchedCards(card) {
//     dispatch(matchedCards(card))
//   },
// })

class Card extends Component {
  //   componentDidUpdate(prevProps) {
  //     if (
  //       this.props.chosenCards.card1 !== prevProps.chosenCards.card1 ||
  //       this.props.chosenCards.card2 !== prevProps.chosenCards.card2
  //     ) {
  //       if (
  //         this.props.chosenCards.card1 &&
  //         this.props.chosenCards.card2 &&
  //         checkCards(this.props.chosenCards)
  //       ) {
  //         // console.log(checkCards(this.props.chosenCards))
  //         this.props.matchedCards(this.props.chosenCards.card1)
  //         this.props.matchedCards(this.props.chosenCards.card2)
  //       }
  //     }
  //   }

//   onClick(e, card) {
//     e.preventDefault()
//     const { card1, card2 } = this.props.chosenCards
//     const { pickCard, flip } = this.props
//     if (!card1) {
//       pickCard(card, 1)
//       flip(card)
//     } else if (!card2) {
//       if (card.row !== card1.row || card.column !== card1.column) {
//         pickCard(card, 2)
//         flip(card)
//       }
//     }
    //  else if (card1 && card2) {
    //   flip(card1)
    //   flip(card2)
    //   if (checkCards(this.props.chosenCards)) {
    //     this.props.matchedCards(card1)
    //     this.props.matchedCards(card2)
    //   }
    //   console.log("This", this)
    //   this.pause = setTimeout(function(){ 
    //     console.log("This", this)
    //     this.props.resetCards()},
    //     750)
      
    //   pickCard(card, 1)
    //   flip(card)
    // }
//   }

  render() {
    const { card, cardClick } = this.props
    // const card1 = this.props.chosenCards.card1
    // const card2 = this.props.chosenCards.card2
    let classes = [styles.card]
    if (card && card.matched) {
      classes = [styles.card, styles.matched]
    } else if (card && card.hidden) {
      classes = [styles.card, styles.backOfCard]
    } else {
      classes = [styles.card]
    }
    return (
      <div>
        {card && (
          <button className={classes.join(' ')} onClick={e => cardClick(e, card)}>
            <span className={styles.innerCard}>{card.value}</span>
          </button>
        )}
      </div>
    )
  }
}

Card.propTypes = {
//   chosenCards: PropTypes.instanceOf(Object).isRequired,
  card: PropTypes.instanceOf(Object),
//   pickCard: PropTypes.func.isRequired,
//   resetCards: PropTypes.func.isRequired,
//   flip: PropTypes.func.isRequired,
//   matchedCards: PropTypes.func.isRequired,
  cardClick: PropTypes.func.isRequired,
}

export default Card
// export default connect(mapStateToProps)(Card)

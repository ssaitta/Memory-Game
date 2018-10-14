import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game/Board.scss'

const Card = props => {
  const { card, cardClick, gameLevel } = props
  let classes
  let innerCardClass
  if (gameLevel === 'easy') {
    innerCardClass = styles.innerCardEasy
    classes = [styles.cardEasy]
    if (card && card.matched) {
      classes.push(styles.matched)
    } else if (card && card.hidden) {
      classes.push(styles.backOfCardEasy)
    }
  } else {
    innerCardClass = styles.innerCardHard
    classes = [styles.cardHard]
    if (card && card.matched) {
      classes.push(styles.matched)
    } else if (card && card.hidden) {
      classes.push(styles.backOfCardHard)
    }
  }
  return (
    <div>
      {card && (
        <button className={classes.join(' ')} onClick={e => cardClick(e, card)}>
          <span className={innerCardClass}>{card.value}</span>
        </button>
      )}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.instanceOf(Object),
  cardClick: PropTypes.func.isRequired,
  gameLevel: PropTypes.string.isRequired,
}

export default Card

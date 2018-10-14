import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Game/Game.scss'

const Card = props => {
  const { card, cardClick } = props

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

Card.propTypes = {
  card: PropTypes.instanceOf(Object),
  cardClick: PropTypes.func.isRequired,
}

export default Card

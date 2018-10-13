import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'
import styles from '../Game/Game.scss'

const CardRow = props => (
  <div className={styles.cardRow}>
    {props.cardRow.map((card, ind) => <Card key={ind} cardClick={props.cardClick} card={card} />)}
  </div>
)

CardRow.propTypes = {
  cardRow: PropTypes.instanceOf(Array).isRequired,
  cardClick: PropTypes.func.isRequired,
}

export default CardRow

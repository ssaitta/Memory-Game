import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { resetCards, resetChoices } from '../../store'
import styles from '../Game/Game.scss'

const mapStateToProps = state => ({
  board: state.board,
})

const mapDispatchToProps = dispatch => ({
  resetBoard(cards) {
    dispatch(resetCards(cards))
  },
  resetCards() {
    dispatch(resetChoices())
  },
})

class ResetButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.resetCards()
    this.props.resetBoard(this.props.board)
  }

  render() {
    return (
      <button className={styles.resetBtn} onClick={this.onClick}>
        Reset
      </button>
    )
  }
}

ResetButton.propTypes = {
  board: PropTypes.instanceOf(Array).isRequired,
  resetBoard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton)

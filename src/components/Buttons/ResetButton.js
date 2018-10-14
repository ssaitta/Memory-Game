import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { resetCards, resetChoices, updateStatus, pauseTime, resetTime } from '../../store'
import styles from '../Styles/Game.scss'

const mapStateToProps = state => ({
  board: state.board,
  status: state.status,
})

const mapDispatchToProps = dispatch => ({
  resetBoard(cards) {
    dispatch(resetCards(cards))
  },
  resetChosen() {
    dispatch(resetChoices())
  },
  updateStatusInProgress() {
    dispatch(updateStatus('In Progress'))
  },
  togglePause(bool) {
    dispatch(pauseTime(bool))
  },
  resetClock() {
    dispatch(resetTime())
  },
})

class ResetButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const { resetChosen, resetBoard, updateStatusInProgress, togglePause, resetClock } = this.props
    resetChosen()
    resetBoard(this.props.board)
    updateStatusInProgress()
    togglePause(true)
    resetClock()
  }

  render() {
    if (this.props.status === 'In Progress') {
      return (
        <button className={styles.resetBtn} onClick={this.onClick}>
          Reset
        </button>
      )
    }
    return (
      <button className={styles.playAgainBtn} onClick={this.onClick}>
        Play again?
      </button>
    )
  }
}

ResetButton.propTypes = {
  board: PropTypes.instanceOf(Array).isRequired,
  status: PropTypes.string,
  resetBoard: PropTypes.func.isRequired,
  resetChosen: PropTypes.func.isRequired,
  updateStatusInProgress: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton)

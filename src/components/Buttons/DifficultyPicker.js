import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setDifficulty, updateStatus, pauseTime, resetTime } from '../../store'
import styles from '../Game/Game.scss'

const mapDispatchToProps = dispatch => ({
  updateDifficulty(difficulty) {
    dispatch(setDifficulty(difficulty))
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

class DifficultyPicker extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    const { updateDifficulty, updateStatusInProgress, togglePause, resetClock } = this.props
    updateDifficulty(e.target.value)
    updateStatusInProgress()
    togglePause(true)
    resetClock()
  }

  render() {
    return (
      <form className={styles.difficultyPicker}>
        <fieldset>
          <legend>Select difficulty</legend>
          <div>
            <input
              type="radio"
              id="easy"
              defaultChecked
              name="difficulty"
              value="easy"
              onClick={e => this.onClick(e)}
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input
              type="radio"
              id="hard"
              name="difficulty"
              value="hard"
              onClick={e => this.onClick(e)}
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </fieldset>
      </form>
    )
  }
}

DifficultyPicker.propTypes = {
  updateDifficulty: PropTypes.func.isRequired,
  updateStatusInProgress: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(DifficultyPicker)

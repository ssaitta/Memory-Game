import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setDifficulty, fetchCards } from '../../store'
import styles from '../Game/Game.scss'

const mapDispatchToProps = dispatch => ({
  setDifficulty(difficulty) {
    dispatch(setDifficulty(difficulty))
  },
  // newBoard(difficulty){
  //   dispatch(fetchCards(difficulty))
  // },
})

class Difficulty extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    this.props.setDifficulty(e.target.value)
  }

  render() {
    return (
      <form className={styles.resetBtn}>
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

Difficulty.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Difficulty)

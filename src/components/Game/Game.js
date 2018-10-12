import React, { Component } from 'react'
import { connect } from 'react-redux'

import Timer from '../Timer/Timer'
import styles from './Game.scss'
import Board from './Board'
import ButtonContainer from '../Buttons/ButtonContainer'
import { setDifficulty, fetchCards, resetTime } from '../../store'

const mapStateToProps = state => ({
  board: state.board,
  difficulty: state.difficulty,
})

const mapDispatchToProps = dispatch => ({
  setDifficulty(difficulty) {
    dispatch(setDifficulty(difficulty))
  },
  newBoard(difficulty) {
    dispatch(fetchCards(difficulty))
  },
  resetTimer() {
    dispatch(resetTime())
  },
})

class Game extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.board !== prevProps.board) {
      // console.log("new board")
      // this.props.newBoard(this.props.difficulty)
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <h1 className={styles.title}>Memory</h1>
        <span className={styles.subTitle}>Match the cards to win!</span>
        <div className={styles.horizontalLineShort} />
        <Timer />
        <div className={styles.horizontalLineLong} />
        <Board />
        <ButtonContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../../store'
import styles from '../Game/Game.scss'

const mapStateToProps = state => ({
  board: state.board,
  difficulty: state.difficulty,
})

const mapDispatchToProps = dispatch => ({
  newBoard(difficulty) {
    dispatch(fetchCards(difficulty))
  },
})

class ResetButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.newBoard(this.props.difficulty)
  }

  render() {
    return (
      <button className={styles.resetBtn} onClick={this.onClick}>
        Reset
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton)

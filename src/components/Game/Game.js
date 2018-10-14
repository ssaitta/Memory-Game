import React from 'react'

import Timer from '../Timer/Timer'
import styles from '../Styles/Game.scss'
import Board from './Board'
import DifficultyPicker from '../Buttons/DifficultyPicker'

const Game = () => (
  <div>
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Memory</h1>
        <span className={styles.subTitle}>Match the cards to win!</span>
      </div>
      <div className={styles.difficultyContainer}>
        <DifficultyPicker />
      </div>
    </div>
    <Timer />
    <div id={styles.gameTable}>
      <Board />
    </div>
  </div>
)

export default Game

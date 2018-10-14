import React from 'react'

import Timer from '../Timer/Timer'
import styles from './Game.scss'
import Board from './Board'
import ButtonContainer from '../Buttons/ButtonContainer'

const Game = () => (
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

export default Game

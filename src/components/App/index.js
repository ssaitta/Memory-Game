import React from 'react'
import { Provider } from 'react-redux'
import Game from '../Game/Game'
import store from '../../store'
import styles from '../Styles/Game.scss'

const App = () => (
  <Provider store={store}>
    <div className={styles.body}>
      <Game />
    </div>
  </Provider>
)

export default App

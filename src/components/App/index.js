import React from 'react'
import { Provider } from 'react-redux'
import store from '../../client/store'

import Game from '../Game/Game'

const App = () => (
  <Provider store={store}>
    <div>
      <Game />
    </div>
  </Provider>
)

export default App

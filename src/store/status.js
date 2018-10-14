const UPDATE_STATUS = 'UPDATE_STATUS'

export const updateStatus = str => ({ type: UPDATE_STATUS, str })

const initalState = 'won' //'In Progress'

const game = function(state = initalState, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return action.str
    default:
      return state
  }
}

export default game

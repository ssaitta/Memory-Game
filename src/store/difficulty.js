const SET_DIFFICULTY = 'SET_DIFFICULTY'

export const setDifficulty = difficulty => ({
  type: SET_DIFFICULTY,
  difficulty,
})

const initalState = 'easy'

const difficulty = (state = initalState, action) => {
  switch (action.type) {
    case SET_DIFFICULTY:
      return action.difficulty
    default:
      return state
  }
}

export default difficulty

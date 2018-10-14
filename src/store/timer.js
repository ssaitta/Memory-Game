const RESET_TIME = 'RESET_TIME'
const PAUSE_TOGGLE = 'PAUSE_TOGGLE'
const INCREMENT_TIME = 'INCREMENT_TIME'

export const resetTime = () => ({ type: RESET_TIME, secondsElapsed: 0 })
export const pauseTime = (bool) => ({ type: PAUSE_TOGGLE, pause: bool })
// export const resumeTime = () => ({type:PAUSE_TOGGLE, pause:false})
export const incrementTime = () => ({ type: INCREMENT_TIME })

const initalState = {
  secondsElapsed: 0,
  pause: true,
}

const timer = function(state = initalState, action) {
  switch (action.type) {
    case RESET_TIME:
      return Object.assign({}, state, { secondsElapsed: 0 })
    case PAUSE_TOGGLE:
      return Object.assign({}, state, { pause: action.pause })
    case INCREMENT_TIME:
      return Object.assign({}, state, { secondsElapsed: state.secondsElapsed + 1 })
    default:
      return state
  }
}

export default timer

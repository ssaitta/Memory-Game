import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from '../Styles/Timer.scss'
import ResetButton from '../Buttons/ResetButton'
import { pauseTime, resetTime, incrementTime } from '../../store'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

const Timer = ({ time = 0 }) => <div className={styles.timer}>{formatTime(time)}</div>

Timer.propTypes = {
  time: PropTypes.number,
}

const mapStateToProps = state => ({
  timer: state.timer,
  status: state.status,
})

const mapDispatchToProps = dispatch => ({
  togglePause(bool) {
    dispatch(pauseTime(bool))
  },
  resetClock() {
    dispatch(resetTime())
  },
  increment() {
    dispatch(incrementTime())
  },
})

class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    this.props.resetClock()
    clearInterval(this.interval)
  }

  tick() {
    if (!this.props.timer.pause) {
      this.props.increment()
    }
  }

  toggleTimer(e) {
    e.preventDefault()
    this.props.togglePause(!this.props.timer.pause)
  }

  render() {
    const { timer, status } = this.props
    return (
      <div className={styles.infoBar}>
        <div className={styles.timerContainer}>
          <Timer time={timer.secondsElapsed} />
          <div className={styles.timerButtonContainer}>
            {!timer.pause && (
              <button className={styles.timerButton} onClick={this.toggleTimer}>
                Pause
              </button>
            )}
          </div>
        </div>
        <div className={styles.resetBtnContainer}>
          {status === 'In Progress' && <ResetButton className={styles.resetBtn} />}
        </div>
      </div>
    )
  }
}

TimerContainer.propTypes = {
  timer: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.string.isRequired,
  resetClock: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer)

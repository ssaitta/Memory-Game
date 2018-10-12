import React from 'react'
import PropTypes from 'prop-types'

import styles from './Timer.scss'

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

class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
      isPaused: false,
      playButton: true,
    }
    this.tick = this.tick.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    if (this.state.isPaused) {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      })
    }
  }

  toggleTimer(e) {
    e.preventDefault()
    this.setState({
      isPaused: !this.state.isPaused,
      playButton: !this.state.playButton,
    })
  }

  render() {
    return (
      <div>
        <Timer time={this.state.secondsElapsed} />
        {this.state.playButton && (
          <button className={styles.timerButton} onClick={e => this.toggleTimer(e)}>
            Start
          </button>
        )}
        {!this.state.playButton && (
          <button className={styles.timerButton} onClick={e => this.toggleTimer(e)}>
            Pause
          </button>
        )}
      </div>
    )
  }
}

export default TimerContainer

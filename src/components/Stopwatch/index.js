
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeElapsedInSeconds: 0,
      isRunning: false,
    }
    this.timerId = null
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStartTimer = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({
          timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
        }))
      }, 1000)
      this.setState({isRunning: true})
    }
  }

  onStopTimer = () => {
    clearInterval(this.timerId)
    this.setState({isRunning: false})
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({timeElapsedInSeconds: 0, isRunning: false})
  }

  renderTime = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = timeElapsedInSeconds % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {isRunning} = this.state
    return (
      <div className="stopwatch-container">
        <div className="timer-container">
          <h1 className="stopwatch-heading">Stopwatch</h1>
          <div className="timer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="stopwatch-image"
            />
            <h1 className="time">{this.renderTime()}</h1>
          </div>
          <div className="buttons-container">
            <button
              type="button"
              className="start-button"
              onClick={this.onStartTimer}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              type="button"
              className="stop-button"
              onClick={this.onStopTimer}
              disabled={!isRunning}
            >
              Stop
            </button>
            <button
              type="button"
              className="reset-button"
              onClick={this.onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch

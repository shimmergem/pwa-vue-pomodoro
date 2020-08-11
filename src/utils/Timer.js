const isDef = val => val !== null && val !== undefined

class Timer {
  duration = 0
  interval = 1000
  remainingTime = 0
  startTime = null
  endTime = null
  timer = null
  markPoint = null
  _intervalCallback = () => {}
  _endCallback = () => {}

  constructor(options) {
    this.duration = options.duration ?? 0
    this.interval = this.interval ?? 1000
    this.intervalCallback = options.intervalCallback
    this.endCallback = options.endCallback
    this.remainingTime = this.duration
  }

  get intervalCallback() {
    return this._intervalCallback
  }
  set intervalCallback(val) {
    this._intervalCallback = typeof val === "function" ? val : () => {}
  }

  get endCallback() {
    return this._endCallback
  }
  set endCallback(val) {
    this._endCallback = typeof val === "function" ? val : () => {}
  }

  get isRunning() {
    return isDef(this.timer)
  }

  start() {
    if (!this.isRunning) {
      this.startTime = new Date().getTime()
      this.runTimer()
    }
  }

  pause() {
    this.clearTimer()
  }

  continue() {
    this.runTimer()
  }

  end() {
    this.remainingTime = 0
    this.endTime = new Date().getTime()
    this.endCallback({
      startTime: this.startTime, 
      endTime: this.endTime,
      remainingTime: this.remainingTime
    })
  }
  
  runTimer() {
    this.clearTimer()
    this.timer = setTimeout(() => {
      this.updateTime()
      if (this.remainingTime <= 0) {
        this.end()
        this.clearTimer()
      } else {
        this.intervalCallback({
          startTime: this.startTime,
          endTime: this.endTime,
          remainingTime: this.remainingTime
        })
        this.continue()
      }
    }, this.interval)
  }

  clearTimer() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = null
  }

  updateTime() {
    const currentTime = new Date().getTime()
    this.markPoint = this.markPoint ?? currentTime
    this.remainingTime = this.remainingTime - (currentTime - this.markPoint)
    this.markPoint = currentTime
  }

  static getTimerManager() {
    return new TimerManager()
  }

}


class TimeManager {
  timer = null

  startTimer(options) {
    return new Promise((resolve, reject) => {
      if (!this.timer) {
        this.timer = new Timer(options)
        resolve(this.timer)
      } else {
        reject({message: '已有任务正在运行'})
      }
    })
  }
}
export default Timer
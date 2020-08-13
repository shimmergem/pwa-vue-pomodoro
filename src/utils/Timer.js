const isDef = val => val !== null && val !== undefined

class TimerEvent {
  callbacksMap = {}

  emit(eventName, ...args) {
    if (Array.isArray(this.callbacksMap[eventName])) {
      this.callbacksMap[eventName].forEach(callback => callback(...args))
    }
  }
  on(eventName, callback) {
    if (!this.callbacksMap[eventName]) {
      this.callbacksMap[eventName] = []
    }
    if (typeof callback === "function") {
      this.callbacksMap[eventName].push(callback)
      return () => this.callbacksMap[eventName].filter(ele => ele != callback)
    } else {
      return () => {}
    }
  }
  destory() {
    Object.keys(this.callbacksMap).forEach(key => this.callbacksMap[key] = [])
  }
}

class Timer extends TimerEvent {
  duration = 0
  interval = 1000
  remainingTime = 0
  startTime = null
  endTime = null
  timer = null
  markPoint = null

  constructor(options) {
    super()
    this.duration = options.duration ?? 0
    this.remainingTime = this.duration
    this.interval = this.interval ?? 1000
  }

  get isRunning() {
    return isDef(this.timer)
  }

  start() {
    if (!this.isRunning) {
      this.startTime = new Date().getTime()
      this.markPoint = this.startTime
      this.runTimer()
      this.emit('start', {startTime: this.startTime,})
    }
  }

  pause() {
    this.clearTimer()
    this.emit('pause')
  }

  continue() {
    this.markPoint = new Date().getTime()
    this.runTimer()
    this.emit('continue')
  }

  end() {
    this.remainingTime = 0
    this.endTime = new Date().getTime()
    this.emit('end', {
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
        this.emit('interval', {
          startTime: this.startTime,
          endTime: this.endTime,
          remainingTime: this.remainingTime
        })
        this.runTimer()
      }
    }, this.interval)
  }

  clearTimer() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = null
  }

  updateTime() {
    const currentTime = new Date().getTime()
    this.remainingTime = this.remainingTime - (currentTime - this.markPoint)
    this.markPoint = currentTime
  }

  destory() {
    super.destory()
    this.clearTimer()
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
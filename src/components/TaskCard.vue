<template>
  <div class="card">
    <div class="cell-1">
      {{formatTime(remainingTime)}}
    </div>
    <div class="cell-2">
      {{taskInfo.value.title}}
    </div>
    <div class="cell-3" >
      <template v-if="remainingTime > 0">
        <icon-font class="icon" @click.native="reset" type="iconreload_time" />
        <template v-if="!isFinished">
          <icon-font v-if="!isRunning" class="icon" @click.native="run" type="iconplay" />
          <icon-font v-else class="icon" @click.native="pause" type="iconsuspended" />
        </template>
      </template>
      <template v-else>
        <icon-font class="icon done" type="icondone" />
      </template>
    </div>
  </div>
</template>

<script>
import {taskFinishedNotification} from '../utils'
import Timer from '../utils/Timer'
import getPlayer from '../utils/player'

export default {
  props: {
    taskInfo: {
      required: true,
      default: null,
    }
  },
  async created() {
    const player = await getPlayer()
  },
  mounted() {
    this.initTimer()
  },
  async beforeDestroy() {
    let data = this.taskInfo.value
    data.duration = this.remainingTime
    this.$db.update('taskTable', data, this.taskInfo.primaryKey)
  },
  data() {
    return {
      startTime: 0,
      endTimer: 0,
      duration: this.taskInfo.value.duration,
      remainingTime: this.taskInfo.value.duration,
      timer: null,
      isFinished: false,
      isRunning: false,
    }
  },
  computed: {
  },
  methods: {
    initTimer() {
      this.timer && this.timer.destory()
      this.timer = new Timer({
        duration: this.taskInfo.value.duration,
      })
      this.timer.on('start', ({startTime}) => {
        this.startTime = startTime
      })
      this.timer.on('interval', ({remainingTime}) => {
        this.remainingTime = remainingTime
      })
      this.timer.on('end', async ({endTime, remainingTime}) => {
        this.endTime = endTime
        this.remainingTime = remainingTime
        const player = await getPlayer()
        taskFinishedNotification(player)
      })
      this.timer.on('pause', () => this.isRunning = false)
    },
    run() {
      this.isRunning = true
      if (this.duration === this.remainingTime) {
        this.start()
      } else {
        this.continue()
      }
    },
    start() {
      this.startTime = 0
      this.timer.start()
    },
    pause() {
      this.timer.pause()
    },
    continue() {
      this.timer.continue()
    },
    reset() {
      this.startTime = 0
      this.endTimer = 0
      this.remainingTime = this.taskInfo.value.duration,
      this.isFinished = false
      this.isRunning = false
      this.initTimer()
    },
    formatNumber(number) {
      if (number >= 10) {
        return number
      } else {
        return '0' + number
      }
    },
    formatTime(value) {
      let seconds = Math.trunc(value / 1000)
      let minute = Math.trunc(seconds / 60)
      let second = seconds % 60
      return `${this.formatNumber(minute)}:${this.formatNumber(second)}`
    }
  }
}
</script>

<style lang="sass" scoped>
  .card {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 8px;
    padding: 0px 12px;
    .cell-1 {
      display: flex;
      align-items: center;
      font-size: 24px;
      width: 100%;
      height: 100%;
    }
    .cell-2 {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .cell-3 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center;
      width: 100%;
      height: 100%;
      .icon {
        font-size: 20px;
      }
      .icon.done {
        font-size: 20px;
        color: #57b363;
        grid-column: 2/3;
        place-self: center;
      }
    }
  }
</style>
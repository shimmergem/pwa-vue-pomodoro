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
          <icon-font v-if="!isRunning" class="icon" @click.native="start" type="iconplay" />
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
import moment from 'moment'
import {taskFinishedNotification} from '../utils'
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
  async beforeDestroy() {
    let data = this.taskInfo.value
    data.duration = this.remainingTime
    this.$db.update('taskTable', data, this.taskInfo.primaryKey)
  },
  data() {
    return {
      startTime: 0,
      currentTime: 0,
      remainingTime: this.taskInfo.value.duration,
      timer: null,
      isFinished: false,
      isRunning: false,
    }
  },
  computed: {
  },
  methods: {
    start() {
      if (!this.timer) {
        this.startTime = new Date().getTime()
        this.isRunning = true
        this.setTimer()
      }
    },
    pause() {
      this.clearTimer()
      this.isRunning = false
    },
    reset() {
      this.clearTimer()
      this.startTime = 0
      this.remainingTime = this.taskInfo.value.duration,
      this.isFinished = false
      this.isRunning = false
    },
    setTimer() {
      this.clearTimer()
      this.timer = setTimeout(async () => {
        this.updateTime()
        if (this.remainingTime <= 0) {
          this.remainingTime = 0
          this.isFinished = true
          const player = await getPlayer()
          taskFinishedNotification(player)
          this.clearTimer()
        } else {
          this.setTimer()
        }
      }, 1000)
    },
    clearTimer() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = null
    },
    updateTime() {
      const currentTime = new Date().getTime()
      this.remainingTime = this.remainingTime - (currentTime - this.startTime)
      this.startTime = currentTime
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
<template>
  <el-main>
    <task-card class="task-card" :time="time" />
  </el-main>
</template>

<script>
import TaskCard from './TaskCard.vue'
export default {
  components: {
    TaskCard
  },
  data() {
    return {
      time: 0.1
    }
  }
}
</script>

<style lang="sass" scoped>
  .task-card {
    height: 48px;
  }
</style>
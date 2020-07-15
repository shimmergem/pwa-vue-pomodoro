<template>
  <div class="container">
    <template v-if="taskList.length && taskList.length > 0">
      <task-card v-for="task in taskList" class="task-card" :key="task.primarykey" :taskInfo="task" />
    </template>
    <template v-else>
      <div class="blank">暂无任务，请添加</div>
    </template>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'
export default {
  components: {
    TaskCard
  },
  async created() {
    this.taskList = await this.readAllTaskFromDB()
  },
  data() {
    return {
      time: 0.1,
      taskList: []
    }
  },
  methods: {
    async readAllTaskFromDB() {
      let {data} = await this.$db.readAll('taskTable')
      return data
    }
  }
}
</script>

<style lang="sass" scoped>
  .container {
    width: 100%;
    height: 100%;
    .task-card {
      height: 80px;
      margin-bottom: 12px;
    }
    .blank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
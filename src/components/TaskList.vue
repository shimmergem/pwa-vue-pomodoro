<template>
  <div>
    <task-card v-for="task in taskList" class="task-card" :key="task.primarykey" :taskInfo="task" />
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
  .task-card {
    height: 80px;
    margin-bottom: 12px;
  }
</style>
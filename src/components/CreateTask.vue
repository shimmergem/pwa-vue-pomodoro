<template>
  <div>
    <el-form :model="taskInfo" ref="taskForm" :rules="rules">
      <el-form-item label="任务标题" prop="title">
        <el-input v-model="taskInfo.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="description">
        <el-input v-model="taskInfo.description" clearable></el-input>
      </el-form-item>
      <el-form-item label="任务持续时间" prop="duration">
        <el-input v-model.number="taskInfo.duration"  placeholder="25" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel" >取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { duration } from 'moment'
export default {
  data() {
    return {
      taskInfo: {
        title: '',
        description: '',
        duration: '',
      },
      rules: { 
        title: [
          {required: true, message: '请输入任务名称', trigger: 'blur'},
          {min: 1, max: 256, message: '名称长度在1到256', trigger: 'blur'},
        ],
        duration: [
          {required: true, message: '请输入任务时长', trigger: 'blur'},
          {type: 'number', trigger: 'change'},
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.taskForm.validate(async valid => {
        if (valid) {
          let duration = this.taskInfo.duration * 60 * 1000
          await this.insertTask({...this.taskInfo, duration})
          this.$message({
            showClose: true,
            message: '任务创建成功！！！',
            type: 'success',
          })
          this.$refs.taskForm.resetFields()
        } else {
          return false
        }
      })
    },
    async insertTask(taskInfo) {
      try { 
        let result = await this.$db.insert('taskTable', taskInfo)
      } catch(e) {
        throw new Error(e)
      }
    },
    cancel() {
      this.$refs.taskForm.resetFields()
    }
  }
}
</script>

<style lang="sass">

</style>
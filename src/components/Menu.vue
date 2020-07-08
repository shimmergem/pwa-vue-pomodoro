<template>
  <el-menu mode="horizontal" @select="handleSelect">
    <el-menu-item index="TaskList"><icon-font class="icon" type="iconlist" /></el-menu-item>
    <el-menu-item index="CreateTask"><icon-font class="icon" type="iconplus" /></el-menu-item>
    <el-menu-item index="AppSetting"><icon-font class="icon" type="iconsetting" /></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(index, indexPath) {
      const routeName = this.$route && this.$route.name
      if (routeName !== index) {
        this.$router.push({name: index})
      }
    }
  }
  
}
</script>

<style lang="sass" scoped>
  .icon {
    font-size: 20px;
  }
</style>
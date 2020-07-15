<template>
  <el-container class='container'>
    <template v-if="this.PWAHelper.isPWA">
      <el-header>
        <Menu />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </template>
    <template v-else>
      <div class="page">
        <span v-if="this.PWAHelper.isInstalled">已安装请从PWA启动</span>
        <a v-else href="#" @click="this.PWAHelper.installPWA">点此安装PWA</a>
      </div>
    </template>
  </el-container>
</template>

<script>
import {openFullScreen, isFromPWA} from './utils/index.js'
import Menu from './components/Menu.vue'
import Main from './components/Main.vue'
import TaskCard from './components/TaskCard.vue'
export default {
  components: {
    Menu,
    Main,
    TaskCard
  }
}
</script>

<style lang="sass" scoped>
  .container {
    flex-direction: column;
  }
  .page {
    width: 100vw;
    height: 100vh;
  }
</style>
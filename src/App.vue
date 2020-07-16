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
        <a v-if="this.PWAHelper.needInstall" href="#" @click="this.PWAHelper.installPWA">点此安装PWA</a>
        <span v-else="">已安装请从PWA启动</span>
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
    width: 100%;
    height: 100%;
  }
  .page {
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
</style>
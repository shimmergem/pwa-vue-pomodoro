<template>
  <el-container v-if="showContent">
    <el-header>
      <Menu />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <el-container v-else-if="this.deferredPrompt">
    <div class="page">
      <a href="#" @click="installPWA">点此</a>安装应用
    </div>
  </el-container>
  <el-container v-else>
    <div class="page">
      {{'已安装请从PWA启动'}}
    </div>
  </el-container>
</template>

<script>
import {openFullScreen, isFromPWA} from './utils/index.js'
import Menu from './components/Menu.vue'
import Main from './components/Main.vue'
import TaskCard from './components/TaskCard.vue'
export default {
  created() {
    this.initPWA()
  },
  mounted() {
    if (this.isFromPWA) {
      window.resizeTo(480, 640)
      window.addEventListener('resize', () => {
        window.resizeTo(480, 640)
      })
    }
  },
  components: {
    Menu,
    Main,
    TaskCard
  },
  data: () => ({
    deferredPrompt: null,
    isFromPWA: false,
    isInstalled: false,
  }),
  computed: {
    formattedTime() {
      return this.date.toString()
    },
    showContent() {
      return this.isFromPWA || this.isInstalled
    }
  },
  methods: {
    async installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt()
        let { outcome } = await this.deferredPrompt.userChoice
        this.isInstalled = outcome === 'accepted'
      } else {
        alert('PWA应用已经安装,无需重复安装')
      }
    },
    initPWA() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        console.log('beforeinstallprompt')
        this.deferredPrompt = e;
      })
      window.addEventListener("appinstalled", (e) => {
        console.log('appinstalled')
        this.isInstalled = true
      })
      this.isFromPWA = isFromPWA()
    },
  }
}
</script>

<style lang="sass" scoped>
  .page {
    width: 100vw;
    height: 100vh;
  }
</style>
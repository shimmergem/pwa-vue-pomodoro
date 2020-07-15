const DISPLAY_MODE = {
  BROWSER_TAB: 'browser tab',
  STANDALONE: 'standalone'
}

let _Vue = null


class PWAHelper {
  deferredPrompt = null
  _vm = null

  constructor() {
    this.addListeners()
    this.init()
  }

  get displayMode() {
    return this._vm.displayMode
  }
  set displayMode(val) {
    this._vm.displayMode = val
  }

  get isInstalled() {
    return this._vm.isInstalled
  }
  set isInstalled(val) {
    this._vm.isInstalled = val
  }

  get isPWA () {
    return this.displayMode === DISPLAY_MODE.STANDALONE
  }

  addListeners() {
    window.addEventListener('DOMContentLoaded', () => {
      console.log(`DOMContentLoaded`)
      this.displayMode = DISPLAY_MODE.BROWSER_TAB
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.displayMode = DISPLAY_MODE.STANDALONE
        this.resizeWindow(480, 640)
      }
      window.matchMedia('(display-mode: standalone)').addListener((evt) => {
        console.log(`display-mode change`)
        this.displayMode = DISPLAY_MODE.BROWSER_TAB
        if (evt.matches) {
          location.reload()
        }
      })
    })
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt')
      this.deferredPrompt = e || null
    })
    window.addEventListener("appinstalled", (e) => {
      console.log('appinstalled')
      this.isInstalled = true
    })
  }  

  init() {
    this._vm = new _Vue({
      data: {
        displayMode: DISPLAY_MODE.BROWSER_TAB,
        isInstalled: false,
      },
      computed: {
        isPWA() {
          return this.displayMode === DISPLAY_MODE.STANDALONE
        }
      }
    })
  }

  resizeWindow(width, height) {
    window.resizeTo(width, height)
    window.addEventListener('resize', () => {
      window.resizeTo(width, height)
    })
  }

  installPWA = async () => {
    this.deferredPrompt.prompt()
    let { outcome } = await this.deferredPrompt.userChoice
  }
}

PWAHelper.install = Vue => {
  _Vue = Vue
  let helper = new PWAHelper()
  Vue.prototype.PWAHelper = helper
}


export default PWAHelper
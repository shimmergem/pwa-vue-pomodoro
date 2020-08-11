const DISPLAY_MODE = {
  BROWSER_TAB: 'browser tab',
  STANDALONE: 'standalone'
}

let _Vue = null

const isDef = val => val !== null && valu !== undefined


class PWAHelper {
  _vm = null

  constructor() {
    this.addListeners()
    this.init()
  }

  get isInstalled() {
    return this._vm.isInstalled
  }
  get isPWA () {
    return this._vm.isPWA
  }
  get needInstall() {
    return this._vm.needInstall
  }

  static install(Vue) {
    _Vue = Vue
    let helper = new PWAHelper()
    Vue.prototype.PWAHelper = helper
  }

  addListeners() {
    window.addEventListener('DOMContentLoaded', () => {
      console.log(`DOMContentLoaded`)
      this._vm.displayMode = DISPLAY_MODE.BROWSER_TAB
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this._vm.displayMode = DISPLAY_MODE.STANDALONE
        this.resizeWindow(480, 640)
      }
      window.matchMedia('(display-mode: standalone)').addListener((evt) => {
        console.log(`display-mode change`)
        this._vm.displayMode = DISPLAY_MODE.BROWSER_TAB
        if (evt.matches) {
          location.reload()
        }
      })
    })
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt')
      this._vm.deferredPrompt = e || null
    })
    window.addEventListener("appinstalled", (e) => {
      console.log('appinstalled')
      this._vm.isInstalled = true
    })
  }

  init() {
    this._vm = new _Vue({
      data: {
        displayMode: DISPLAY_MODE.BROWSER_TAB,
        isInstalled: false,
        deferredPrompt: null,
      },
      computed: {
        isPWA() {
          return this.displayMode === DISPLAY_MODE.STANDALONE
        },
        needInstall() {
          return !this.isInstalled  && isDef(this.deferredPrompt)
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

export default PWAHelper
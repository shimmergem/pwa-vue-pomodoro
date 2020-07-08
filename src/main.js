import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import InconFontPlugin from './plugins/IconFont'
import router from './router'
import DBPlugin from './DB'
import 'element-ui/lib/theme-chalk/index.css';
import './registerSw'

Vue.use(ElementUI)
Vue.use(InconFontPlugin, {scriptUrl: '//at.alicdn.com/t/font_1901470_ck4nu9v1iln.js'})
Vue.use(DBPlugin, {
  name: 'taskDB',
  tables: [
    {
      name: 'taskTable',
      options: {
        autoIncrement: true
      }
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 村长喊你去搬砖

import Vue from 'vue'
import Main from './Main.vue'

const MessageCtor = Vue.extend(Main)

function Message(options) {
  let instance = new MessageCtor({data: options})
  instance.$mount()
  document.body.appendChild(instance.$el)
  if (instance.duration) {
    setTimeout(() => {
      Message.destroy(instance)
    }, instance.duration)
  }
}

Message.destroy = (instance) => {
  document.body.removeChild(instance.$el)
  instance.close()
  instance.$destroy()
}

Message.install = (Vue) => {
  Vue.prototype.$message2 = Message
}

export default Message
import { askNotificationPermission } from './utils'

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('./sw.js').then((result) => {
    return askNotificationPermission()
  }).then(() => {
    console.log('notification success')
  }).catch(() => {
    console.log('fail')
  });
}

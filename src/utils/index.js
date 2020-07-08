import taskFinishedNotification from './TaskFinished'

const openFullScreen = () => {
  let html = window.document.documentElement
  html.requestFullscreen()
}

const isFromPWA = () => {
  if (window.matchMedia) {
    const {matches} = window.matchMedia(`(display-mode: standalone)`)
    return matches
  } else {
    return false
  }
}

const askNotificationPermission = () => {
  return new Promise((resolve, reject) => {
    let permissionResult = Notification.requestPermission((result) => resolve(result))
    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  }).then(result => {
    if(result !== 'granted') {
      throw new Error('We weren\'t granted permission.')
    }
  })
}

export { openFullScreen, isFromPWA, askNotificationPermission, taskFinishedNotification }
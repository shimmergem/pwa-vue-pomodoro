function taskFinishedNotification(player) {
  let title = '任务完成'
  let requireInteraction = true
  let notification = new Notification(title, {requireInteraction})
  notification.addEventListener('show', () => {
    player.start()
  })
  notification.addEventListener('close', () => {
    player.stop()
  })
  notification.addEventListener('click', e => {
    notification.close()
  })
  notification.onshow()
}

export default taskFinishedNotification
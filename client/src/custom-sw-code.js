let silent = false

function startSilentTimer() {
  silent = true
  setTimeout(() => {
    silent = false
  }, 10000)
}

self.addEventListener("push", event => {
  const data = event.data.json()
  if (data) {
    const promiseChain = self.registration
      .getNotifications()
      .then(findNotifications)
      .then(currentNotification => {
        if (currentNotification) {
          currentNotification.close()
        }
      })
      .then(isClientFocused)
      .then(clientIsFocused => {
        if (clientIsFocused && data.title !== "Not-Chat") {
          return
        }
        let silentTemp = silent
        if (!silent) {
          startSilentTimer()
        }
        return self.registration.showNotification(data.title, {
          body: `${data.userName}: ${data.body.substr(0, 80)}`,
          icon: data.icon,
          renotify: true,
          tag: "redroom",
          silent: silentTemp,
        })
      })
    event.waitUntil(promiseChain)
  }
})

self.addEventListener("notificationclick", function(event) {
  event.notification.close()

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if ("focus" in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      })
  )
})

function isClientFocused() {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(windowClients => {
      let clientIsFocused = false

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i]
        if (windowClient.focused) {
          clientIsFocused = true
          break
        }
      }

      return clientIsFocused
    })
}

function findNotifications(notifications) {
  let currentNotification
  for (let i = 0; i < notifications.length; i++) {
    currentNotification = notifications[i]
  }
  return currentNotification
}

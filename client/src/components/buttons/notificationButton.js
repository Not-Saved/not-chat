import React, { useState, useEffect } from "react"
import { IoMdNotificationsOff } from "react-icons/io"

import {
  getNotificationPermission,
  requestNotificationPermission,
  getPushSubscription,
  subscribeToPush,
} from "../../util/pushNotifications"
import { useUserContext } from "../../hooks/contextHooks"

import * as styles from "./notificationButton.module.css"

const NotificationButton = () => {
  const [permission, setPermission] = useState(null)
  const { user } = useUserContext()

  useEffect(() => {
    if (permission === "granted") {
      getPushSubscription().then(sub => {
        if (!sub || !user.pushSubscriptions.includes(JSON.stringify(sub)))
          subscribeToPush()
      })
    }
  }, [permission, user.pushSubscriptions])

  useEffect(() => {
    const permission = getNotificationPermission()
    setPermission(permission)
  }, [])

  async function requestPermission() {
    const newPermission = await requestNotificationPermission()
    setPermission(newPermission)
  }

  const visibility = permission === "granted" ? "hidden" : "visible"
  return (
    <button
      aria-label="notification-button"
      className={styles.button}
      onClick={requestPermission}
      disabled={permission === "denied"}
      style={{ visibility }}
    >
      <IoMdNotificationsOff className="clickable" />
    </button>
  )
}

export default NotificationButton

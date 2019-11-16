import React, { useState, useEffect } from "react"
import { IoMdNotificationsOff } from "react-icons/io"

import {
  getNotificationPermission,
  requestNotificationPermission,
  getPushSubscription,
  subscribeToPush,
} from "../../util/pushNotifications"

import styles from "./notificationButton.module.css"

const NotificationButton = () => {
  const [permission, setPermission] = useState(null)

  useEffect(() => {
    if (permission === "granted") {
      getPushSubscription().then(sub => {
        if (!sub) subscribeToPush()
      })
    }
  }, [permission])

  useEffect(() => {
    const permission = getNotificationPermission()
    setPermission(permission)
  }, [])

  async function requestPermission() {
    const newPermission = await requestNotificationPermission()
    setPermission(newPermission)
  }

  if (permission === "granted") return null
  return (
    <button
      aria-label="notification-button"
      className={styles.button}
      onClick={requestPermission}
      disabled={permission === "denied"}
    >
      <IoMdNotificationsOff className="clickable" />
    </button>
  )
}

export default NotificationButton

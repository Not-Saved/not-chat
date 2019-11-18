import React from "react"

import styles from "./roomDisplay.module.css"

const RoomDisplay = ({ room, onlineUsers }) => {
  if (!room || !onlineUsers) return null
  const users = room.users.length
  const online = onlineUsers.length
  return (
    <div className={styles.room}>
      <h2>{room.name || "Room"}</h2>
      <p>{`${Math.max(users, online)} members | ${online} online`}</p>
    </div>
  )
}

export default RoomDisplay

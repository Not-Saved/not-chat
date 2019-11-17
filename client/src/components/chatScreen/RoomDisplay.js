import React from "react"

import styles from "./roomDisplay.module.css"

const RoomDisplay = ({ room, onlineUsers }) => {
  if (!room) return null
  const users = room.users.length
  const online = onlineUsers && onlineUsers.length
  return (
    <div className={styles.room}>
      <h2>{room.name || "Room"}</h2>
      <p>{`${users} members | ${online} online`}</p>
    </div>
  )
}

export default RoomDisplay

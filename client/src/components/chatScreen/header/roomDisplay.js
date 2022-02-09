import React from "react"

import * as styles from "./roomDisplay.module.css"

const RoomDisplay = ({ room, onlineUsers, connected }) => {
  if (!room || !onlineUsers) return null
  const users = room.users.length
  const online = onlineUsers.length
  const onlineString = connected ? `| ${online} online` : ""
  return (
    <div className={styles.room}>
      <h2>{room.name || "Room"}</h2>
      <p>{`${Math.max(users, online)} members ${onlineString}`}</p>
    </div>
  )
}

export default RoomDisplay

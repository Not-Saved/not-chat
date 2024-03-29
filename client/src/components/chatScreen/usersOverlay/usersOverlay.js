import React from "react"

import * as styles from "./usersOverlay.module.css"

const UsersOverlay = ({ room, onlineUsers, connected }) => {
  if (!room || !onlineUsers) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.userList}>
        {room.users.map(user => {
          const isOnline =
            onlineUsers.includes(user._id) && connected ? styles.online : ""
          return (
            <div key={user._id} className={styles.user}>
              <div className={[styles.picture, isOnline].join(" ")}>
                <img src={user.picture} alt="" />
              </div>
              <div className={styles.info}>
                <h2>{user.userName}</h2>
                <p>{isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersOverlay

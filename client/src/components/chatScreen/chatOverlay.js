import React from "react"

import styles from "./chatOverlay.module.css"

const ChatOverlay = ({ room, onlineUsers }) => {
  if (!room || !onlineUsers) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.userList}>
        {room.users.map(user => {
          const isOnline = onlineUsers.includes(user._id) ? styles.online : ""
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

export default ChatOverlay

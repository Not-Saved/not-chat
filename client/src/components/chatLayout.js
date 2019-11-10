import React from "react"

import styles from "./chatLayout.module.css"

const ChatLayout = ({ children, input }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.messages}>{children}</div>
      <div className={styles.input}>{input}</div>
    </div>
  )
}

export default ChatLayout

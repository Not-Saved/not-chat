import React from "react"

import styles from "./chatLayout.module.css"

const ChatLayout = ({ children }) => {
  return <div className={styles.layout}>{children}</div>
}

export default ChatLayout

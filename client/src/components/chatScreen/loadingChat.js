import React from "react"

import styles from "./loadingChat.module.css"
import { IoIosSync } from "react-icons/io"

const LoadingChat = ({ loading }) => {
  const isLoading = loading ? "" : styles.hidden
  return (
    <div className={`${styles.loading} ${isLoading}`}>
      <IoIosSync className="spin" />
      <span>Loading messages</span>
    </div>
  )
}

export default LoadingChat

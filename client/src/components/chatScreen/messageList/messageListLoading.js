import React from "react"

import styles from "./messageListLoading.module.css"
import { IoIosSync } from "react-icons/io"

const LoadingChat = ({ loading, text }) => {
  const isLoading = loading ? "" : styles.hidden
  return (
    <div className={`${styles.loading} ${isLoading}`}>
      <IoIosSync className="spin" />
      <span>{text}</span>
    </div>
  )
}

export default LoadingChat

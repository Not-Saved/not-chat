import React from "react"
import { IoIosSync } from "react-icons/io"

import styles from "./placeholderList.module.css"

const PlaceholderList = () => {
  return (
    <div className={styles.placeholder}>
      <IoIosSync className="spin" />
    </div>
  )
}

export default PlaceholderList

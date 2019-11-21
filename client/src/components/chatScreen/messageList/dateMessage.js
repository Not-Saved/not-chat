import React from "react"

import styles from "./dateMessage.module.css"

const DateMessage = React.memo(({ text }) => {
  return (
    <div className={styles.container} role="cell">
      <div className={styles.message}>{text}</div>
    </div>
  )
})

export default DateMessage

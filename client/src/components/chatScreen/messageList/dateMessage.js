import React from "react"

import * as styles from "./dateMessage.module.css"

const DateMessage = React.memo(({ text }) => {
  return (
    <div className={styles.container} role="cell">
      <div className={styles.message}>
        <div className={styles.divider}> </div>
        <div className={styles.date}>{text}</div>
        <div className={styles.divider}> </div>
      </div>
    </div>
  )
})

export default DateMessage

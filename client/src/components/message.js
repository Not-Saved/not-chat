import React from "react"
import { FaCheck } from "react-icons/fa"

import styles from "./message.module.css"

const Message = React.memo(({ text, from, mine, arrow }) => {
  const isMine = mine ? styles.right : ""
  const isArrow = arrow ? styles.arrow : ""
  return (
    <div className={[styles.container, isMine].join(" ")}>
      <div className={[styles.message, isMine, isArrow].join(" ")}>
        <div className={styles.from}>
          <strong>{from}</strong>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>{text}</div>
          <div className={styles.angle}>
            <div className={styles.time}>
              {new Date().toLocaleTimeString("it", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <FaCheck className={styles.check} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Message

import React from "react"
import { FaCheck } from "react-icons/fa"

import styles from "./message.module.css"

const Message = React.memo(({ date, text, from, mine, arrow, picture }) => {
  const isMine = mine ? styles.right : ""
  const isArrow = arrow ? styles.arrow : ""
  return (
    <div className={[styles.container, isMine, isArrow].join(" ")} role="cell">
      <div className={[styles.grid, isMine].join(" ")}>
        <div className={styles.picture}>
          <div>
            <img src={picture} alt=""></img>
          </div>
        </div>
        <div className={[styles.message, isMine, isArrow].join(" ")}>
          <div className={styles.from}>
            <strong>{from}</strong>
          </div>
          <div className={styles.content}>
            <div className={styles.text}>{text}</div>
            <div className={styles.angle}>
              <div className={styles.time}>{date}</div>
              <FaCheck className={styles.check} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Message

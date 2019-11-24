import React from "react"
import { FaCheck, FaRegCircle } from "react-icons/fa"

import styles from "./message.module.css"
import replaceURLs from "../../../util/replaceURLs"

const Message = ({ date, text, from, picture, mine, arrow, status }) => {
  const isMine = mine ? styles.right : ""
  const isArrow = arrow ? styles.arrow : ""
  const splitText = text.split(/\n/).map(e => (e ? e : "\n"))
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
            {splitText.map((block, idx) => {
              if (idx + 1 < splitText.length) {
                return (
                  <div key={idx} className={styles.text}>
                    {replaceURLs(block.trim())}
                  </div>
                )
              } else {
                return (
                  <div key={idx} className={styles.lastLine}>
                    <div className={styles.text}>
                      {replaceURLs(block.trim())}
                    </div>
                    <div className={styles.angle}>
                      <div className={styles.time}>{date}</div>
                      {status === "PENDING" ? (
                        <FaRegCircle className={styles.check} />
                      ) : (
                        <FaCheck className={styles.check} />
                      )}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Message)

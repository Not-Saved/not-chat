import React from "react"
import { FaCheck, FaRegCircle } from "react-icons/fa"

import * as styles from "./message.module.css"
import replaceURLs from "../../../util/replaceURLs"

const Message = ({ date, text, from, picture, mine, arrow, status }) => {
  const isMine = mine ? styles.right : ""
  const isArrow = arrow ? styles.arrow : ""
  const textArray = replaceURLs(text.split(" "))

  return (
    <div className={[styles.container, isMine, isArrow].join(" ")} role="cell">
      <div className={[styles.grid, isMine].join(" ")}>
        <div className={styles.picture}>
          <div>
            <img src={picture} alt=""></img>
          </div>
        </div>
        <div className={[styles.message, isMine, isArrow].join(" ")}>
          <div>
            <strong>{from}</strong>
          </div>
          <div>
            <div className={styles.text}>{textArray}</div>
            <div className={styles.angleContainer}>
              <span>{date}</span>
              <div className={styles.angle}>
                <div>{date}</div>
                {status === "PENDING" ? (
                  <FaRegCircle className={styles.check} />
                ) : (
                  <FaCheck className={styles.check} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Message)

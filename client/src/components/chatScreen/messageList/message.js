import React from "react"
import { FaCheck, FaRegCircle } from "react-icons/fa"

import * as styles from "./message.module.css"
import replaceURLs from "../../../util/replaceURLs"

const Message = ({ date, text, from, picture, mine, arrow, status }) => {
  const isMine = mine ? styles.right : ""
  const isArrow = arrow ? styles.arrow : ""
  const textArray = text.split(/\n/).map(block => {
    const wordArray = block.split(" ").map(e => `${e} `)
    const arrayWithAnchorTags = replaceURLs(wordArray).flat()
    return arrayWithAnchorTags
      .map(e =>
        e.length > 10 && typeof e === "string" ? e.match(/[\s\S]{1,10}/g) : e
      )
      .flat()
  })

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
          <div className={styles.contentContainer}>
            {textArray.map((block, outerIndex) => (
              <div key={outerIndex} className={styles.content}>
                {block.map((block, innerIndex) => {
                  return typeof block === "string" ? (
                    <span key={innerIndex} className={styles.text}>
                      {block}
                    </span>
                  ) : (
                    block
                  )
                })}
                {textArray.length === outerIndex + 1 && (
                  <div className={styles.angle}>
                    <div>{date}</div>
                    {status === "PENDING" ? (
                      <FaRegCircle className={styles.check} />
                    ) : (
                      <FaCheck className={styles.check} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Message)

import React, { useState, useEffect } from "react"
import { AiOutlineLoading } from "react-icons/ai"

import * as styles from "./gifMasonry.module.css"

const Gif = ({ gif, still, width, height, isScrolling, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [loadGif, setLoadGif] = useState(false)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    if (!isScrolling && imageLoaded && !loadGif) {
      setLoadGif(true)
    }
  }, [imageLoaded, loadGif, isScrolling])

  const visibility = reveal ? styles.hidden : ""

  return (
    <div style={{ height: Number(height), width: Number(width) }}>
      <div>
        {loadGif && (
          <img
            className={styles.gif}
            onLoad={() => setReveal(true)}
            onClick={() => onClick(gif)}
            src={gif.images.fixed_width.webp}
            alt=""
          ></img>
        )}
        <img
          className={`${styles.still} ${visibility}`}
          onLoad={() => setImageLoaded(true)}
          src={still}
          alt=""
        />
        {!imageLoaded && (
          <div className={styles.loading}>
            <AiOutlineLoading className="spin" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Gif

import React from "react"

import * as styles from "./overlay.module.css"

const Overlay = ({ visible, children }) => {
  const isVisible = visible ? styles.visible : ""

  return (
    <div className={`${styles.overlay} ${isVisible}`}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Overlay

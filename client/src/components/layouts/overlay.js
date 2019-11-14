import React from "react"

import styles from "./overlay.module.css"

const Menu = ({ visible, children }) => {
  const isVisible = visible ? styles.visible : ""
  return (
    <div className={`${styles.overlay} ${isVisible}`}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Menu

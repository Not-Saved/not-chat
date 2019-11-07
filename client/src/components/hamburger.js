import React from "react"

import styles from "./hamburger.module.css"

const Hamburger = ({ checked, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.toggler}
        value={checked}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.hamburger}>
        <div></div>
      </div>
    </div>
  )
}

export default Hamburger

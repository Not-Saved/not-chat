import React from "react"
import { IoIosSync } from "react-icons/io"

import styles from "./splashScreen.module.css"

const SplashScreen = () => {
  return (
    <div className={styles.splash}>
      <IoIosSync className="spin" />
    </div>
  )
}

export default SplashScreen

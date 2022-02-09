import React from "react"
import { IoIosSync } from "react-icons/io"

import { splash } from "./splashScreen.module.css"

const SplashScreen = () => {
  return (
    <div className={splash}>
      <IoIosSync className="spin" />
    </div>
  )
}

export default SplashScreen

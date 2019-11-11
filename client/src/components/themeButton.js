import React from "react"
import { IoMdMore } from "react-icons/io"

import useTheme from "../hooks/useTheme"

import styles from "./themeButton.module.css"

const ThemeButton = () => {
  const { changeTheme } = useTheme()
  return (
    <button className={styles.button} onClick={changeTheme}>
      <IoMdMore className="clickable" />
    </button>
  )
}

export default ThemeButton

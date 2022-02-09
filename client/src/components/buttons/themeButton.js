import React from "react"
import { IoMdMore } from "react-icons/io"

import { useThemeContext } from "../../hooks/contextHooks"

import * as styles from "./themeButton.module.css"

const ThemeButton = () => {
  const { changeTheme } = useThemeContext()
  return (
    <button
      aria-label="theme-button"
      className={styles.button}
      onClick={changeTheme}
    >
      <IoMdMore className="clickable" />
    </button>
  )
}

export default ThemeButton

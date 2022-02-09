import React from "react"
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md"

import { useThemeContext } from "../../hooks/contextHooks"

import * as styles from "./themeButton.module.css"

const ThemeButton = () => {
  const { changeTheme, theme } = useThemeContext()
  return (
    <button
      aria-label="theme-button"
      className={styles.button}
      onClick={changeTheme}
      title="Toogle dark mode"
    >
      {theme === "dark" ? (
        <MdDarkMode className="clickable" />
      ) : (
        <MdOutlineDarkMode className={`clickable ${styles.op}`} />
      )}
    </button>
  )
}

export default ThemeButton

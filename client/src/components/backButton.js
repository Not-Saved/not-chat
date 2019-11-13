import React from "react"
import { IoIosArrowBack } from "react-icons/io"

import styles from "./themeButton.module.css"
import { Link } from "gatsby"

const BackButton = () => {
  return (
    <Link to="/">
      <button aria-label="theme-button" className={styles.button}>
        <IoIosArrowBack className="clickable" />
      </button>
    </Link>
  )
}

export default BackButton

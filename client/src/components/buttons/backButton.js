import React from "react"
import { AiOutlineRollback } from "react-icons/ai"

import styles from "./backButton.module.css"
import { Link } from "gatsby"

const BackButton = () => {
  return (
    <Link to="/" className={styles.back}>
      <AiOutlineRollback className="clickable" />
    </Link>
  )
}

export default BackButton

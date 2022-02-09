import React from "react"
import { AiOutlineRollback } from "react-icons/ai"

import * as styles from "./backButton.module.css"
import { Link } from "gatsby"

const BackButton = ({ reload }) => {
  return (
    <Link to="/" className={styles.back}>
      <AiOutlineRollback
        className="clickable"
        onClick={reload ? window.location.reload : null}
      />
    </Link>
  )
}

export default BackButton

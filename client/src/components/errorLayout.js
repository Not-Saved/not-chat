import React from "react"

import ErrorIcon from "../svg/errorIcon"

import styles from "./errorLayout.module.css"
import BackButton from "./backButton"

const ErrorLayout = ({ headerText, subText }) => (
  <div className={styles.error}>
    <BackButton />
    <div className={styles.icon}>
      <ErrorIcon />
    </div>
    <h1>{headerText}</h1>
    <p>{subText}</p>
  </div>
)

export default ErrorLayout

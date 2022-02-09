import React from "react"

import ErrorIcon from "../../svg/errorIcon"
import BackButton from "../buttons/backButton"

import * as styles from "./errorLayout.module.css"

const ErrorLayout = ({ headerText, subText, reload }) => (
  <div className={styles.error}>
    <BackButton reload={reload} />
    <div className={styles.icon}>
      <ErrorIcon />
    </div>
    <h1>{headerText}</h1>
    <p>{subText}</p>
  </div>
)

export default ErrorLayout

import React from "react"

import "./src/styles/index.css"
import "./src/styles/themes.css"
import "./src/styles/misc.css"

export const wrapRootElement = ({ element }) => {
  return <Wrapper>{element}</Wrapper>
}

const Wrapper = ({ children }) => {
  const theme = "light"
  return <div className={`${theme} theme`}>{children}</div>
}

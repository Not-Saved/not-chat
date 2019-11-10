import React from "react"

import "./src/styles/index.css"

export const wrapRootElement = ({ element }) => {
  return <Wrapper>{element}</Wrapper>
}

const Wrapper = ({ children }) => {
  return children
}

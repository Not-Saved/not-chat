import React from "react"
import useWindowSize from "./src/hooks/useWindowSize"

import "./src/styles/index.css"

export const wrapRootElement = ({ element }) => {
  return <Wrapper>{element}</Wrapper>
}

const Wrapper = ({ children }) => {
  useWindowSize()
  return children
}

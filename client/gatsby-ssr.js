import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"

import "./src/styles/index.css"
import "./src/styles/themes.css"
import "./src/styles/misc.css"

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

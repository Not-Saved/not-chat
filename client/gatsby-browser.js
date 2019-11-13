import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"
import { UserProvider } from "./src/context/UserContext"
import ErrorBoundary from "./src/components/errorBoundary"
import ErrorLayout from "./src/components/errorLayout"

import "./src/styles/index.css"
import "./src/styles/themes.css"
import "./src/styles/misc.css"

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </UserProvider>
  )
}

export const wrapPageElement = ({ element }) => {
  return (
    <ErrorBoundary
      fallback={
        <ErrorLayout
          headerText="ERROR :("
          subText="Something went wrong somewhere..."
        />
      }
    >
      {element}
    </ErrorBoundary>
  )
}

import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"
import { UserProvider } from "./src/context/UserContext"
import ErrorBoundary from "./src/components/general/errorBoundary"
import ErrorLayout from "./src/components/layouts/errorLayout"
import RedirectHandler from "./src/components/general/redirectHandler"

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

export const wrapPageElement = ({ element, props }) => {
  return (
    <ErrorBoundary
      fallback={
        <ErrorLayout
          reload
          headerText="ERROR :("
          subText="Something went wrong somewhere..."
        />
      }
    >
      <RedirectHandler {...props}>{element}</RedirectHandler>
    </ErrorBoundary>
  )
}

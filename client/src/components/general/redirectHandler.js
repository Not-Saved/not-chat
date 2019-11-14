import React from "react"
import { useUserContext } from "../../hooks/contextHooks"
import SplashScreen from "../layouts/splashScreen"

const RedirectHandler = ({ children, navigate, location }) => {
  const { user, checked } = useUserContext()

  const renderHome = () => {
    if (user) {
      navigate("/chat")
      return <SplashScreen />
    } else {
      return children
    }
  }

  const renderChat = () => {
    if (!user) {
      navigate("/")
      return <SplashScreen />
    } else {
      return children
    }
  }

  if (!checked) return <SplashScreen />
  switch (location.pathname) {
    case "/":
      return renderHome()
    case "/chat":
      return renderChat()
    default:
      return children
  }
}

export default RedirectHandler

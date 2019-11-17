import React from "react"
import { useUserContext } from "../../hooks/contextHooks"
import SplashScreen from "../layouts/splashScreen"

const RedirectHandler = ({ children, navigate, location }) => {
  const { user, checked } = useUserContext()

  const renderChat = () => {
    if (!user) {
      navigate("/login")
      return <SplashScreen />
    } else {
      return children
    }
  }

  const renderLogin = () => {
    if (user) {
      navigate("/")
      return <SplashScreen />
    } else {
      return children
    }
  }

  if (!checked) return <SplashScreen />
  switch (location.pathname) {
    case "/":
      return renderChat()
    case "/login":
    case "/login/":
      return renderLogin()
    default:
      return children
  }
}

export default RedirectHandler

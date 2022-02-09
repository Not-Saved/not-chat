import React from "react"
import Seo from "../components/general/seo"

import "../styles/home.css"

const LoginPage = () => {
  return (
    <div className="home-page">
      <Seo title="Login" />
      <div className="login-link">
        <a href="/oauth/google">Login</a>
      </div>
    </div>
  )
}

export default LoginPage

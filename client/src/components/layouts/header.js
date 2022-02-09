import React from "react"
import { header } from "./header.module.css"

const Header = ({ children }) => {
  return <header className={header}>{children}</header>
}

export default Header

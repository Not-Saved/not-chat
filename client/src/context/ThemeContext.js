import React, { useState, useRef, useEffect } from "react"
import SplashScreen from "../components/splashScreen"

export const ThemeContext = React.createContext({
  theme: "",
  changeTheme: () => {},
  primaryColor: "",
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState()
  const [primaryColor, setPrimaryColor] = useState()
  const themeRef = useRef(null)

  function changeTheme() {
    const changeTo = theme === "light" ? "dark" : "light"
    setTheme(changeTo)
  }

  useEffect(() => {
    function loadTheme() {
      const theme = localStorage.getItem("theme")
      return theme || "light"
    }
    setTheme(loadTheme())
  }, [])

  useEffect(() => {
    if (themeRef.current) {
      const style = getComputedStyle(themeRef.current)
      const primaryColor = style.getPropertyValue("--primary-color")
      setPrimaryColor(primaryColor)
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, primaryColor }}>
      <div ref={themeRef} className={`${theme} theme`}>
        {theme ? children : <SplashScreen />}
      </div>
    </ThemeContext.Provider>
  )
}

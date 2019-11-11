import React, { useState, useRef, useEffect } from "react"

export const ThemeContext = React.createContext({
  theme: "light",
  changeTheme: () => {},
  primaryColor: "",
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(loadTheme())
  const [primaryColor, setPrimaryColor] = useState()
  const themeRef = useRef(null)

  function changeTheme() {
    const changeTo = theme === "light" ? "dark" : "light"
    setTheme(changeTo)
  }

  function loadTheme() {
    if (typeof window !== `undefined`) {
      const theme = window && localStorage.getItem("theme")
      return theme || "light"
    }
    return "light"
  }

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
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { UserContext } from "../context/UserContext"

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function useUserContext() {
  return useContext(UserContext)
}

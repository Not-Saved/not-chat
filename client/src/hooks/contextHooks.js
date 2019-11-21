import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { UserContext } from "../context/UserContext"
import { OverlayContext } from "../context/OverlayContext"

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function useUserContext() {
  return useContext(UserContext)
}

export function useOverlay() {
  return useContext(OverlayContext)
}

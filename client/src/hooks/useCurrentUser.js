import { useState, useCallback } from "react"
import { apiRequest } from "../api"

export default function useCurrentUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(null)

  const getUser = useCallback(async () => {
    try {
      setLoading(true)
      let response = await apiRequest({
        method: "get",
        url: "/current_user",
      })
      if (!response.data.rooms.length) {
        const roomId =
          process.env.GATSBY_DEFAULT_ROOM || "5db0a60c89a5582114d5c2e3"
        await apiRequest({
          method: "POST",
          url: `/rooms/${roomId}`,
        })
      }
      setUser(response.data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
      setChecked(true)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      setUser(null)
      await apiRequest({
        method: "get",
        url: "/logout",
      })
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
      setChecked(false)
    }
  }, [])

  return { user, error, loading, checked, getUser, logout }
}

import React, { useEffect } from "react"
import useCurrentUser from "../hooks/useCurrentUser"

export const UserContext = React.createContext({
  user: null,
  error: null,
  loading: false,
  checked: false,
  getUser: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }) => {
  const userProps = useCurrentUser()
  const { getUser } = userProps

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  )
}

export default UserContext

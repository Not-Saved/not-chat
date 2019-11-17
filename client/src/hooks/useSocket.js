import { useState, useEffect, useReducer, useCallback } from "react"
import io from "socket.io-client"

export default function() {
  const [messages, dispatch] = useReducer(messageReducer, null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socket, setSocket] = useState()

  const connect = useCallback(messages => {
    const socket = io.connect("", {
      "force new connection": true,
      path: "/ws/socket.io",
    })
    setSocket(socket)
    dispatch({ type: "INITIATE", payload: messages })
  }, [])

  function sendMessage(msg) {
    const roomId = process.env.GATSBY_DEFAULT_ROOM || "5db0a60c89a5582114d5c2e3"
    socket.emit("message", roomId, msg)
  }

  useEffect(() => {
    if (socket) {
      socket.on("message", msg => {
        dispatch({ type: "MESSAGE", payload: msg })
      })
      socket.on("online_users", ({ room, users }) => {
        const roomId =
          process.env.GATSBY_DEFAULT_ROOM || "5db0a60c89a5582114d5c2e3"
        if (room === roomId) setOnlineUsers(users)
      })
      return () => socket.disconnect()
    }
  }, [socket])

  return {
    messages,
    connect,
    sendMessage,
    onlineUsers,
    connected: Boolean(socket),
  }
}

function messageReducer(state, action) {
  switch (action.type) {
    case "MESSAGE":
      return [...state, action.payload]
    case "INITIATE":
      return action.payload
    default:
      return state
  }
}

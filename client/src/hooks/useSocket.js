import { useState, useEffect, useReducer, useCallback } from "react"
import io from "socket.io-client"

export default function() {
  const [messages, dispatch] = useReducer(messageReducer, [])
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
    socket.emit("message", "5db0a60c89a5582114d5c2e3", msg)
  }

  useEffect(() => {
    if (socket) {
      socket.on("message", msg => {
        dispatch({ type: "MESSAGE", payload: msg })
      })
      socket.on("online_users", ({ room, users }) => {
        if (room === "5db0a60c89a5582114d5c2e3") setOnlineUsers(users)
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

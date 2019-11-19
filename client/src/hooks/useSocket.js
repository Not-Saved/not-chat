import { useState, useEffect, useReducer, useCallback } from "react"
import io from "socket.io-client"

import { apiRequest } from "../api"

const roomId = process.env.GATSBY_DEFAULT_ROOM || "5db0a60c89a5582114d5c2e3"

export default function(currentUser) {
  const [messages, dispatch] = useReducer(messageReducer, null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [room, setRoom] = useState(null)
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)

  const connect = useCallback(messages => {
    dispatch({ type: "INITIATE", payload: messages })
    const socket = io.connect("", {
      path: "/ws/socket.io",
    })
    setSocket(socket)
  }, [])

  function sendMessage(msg) {
    const message = {
      content: msg,
      createdAt: Date.now(),
      user: currentUser,
      status: "PENDING",
    }
    dispatch({ type: "MESSAGE", payload: message })
    socket.emit("message", roomId, message)
  }

  async function getRoom(roomId) {
    const room = await apiRequest({ url: `/rooms/${roomId}` })
    setRoom(room.data)
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setConnected(socket.connected)
      })

      socket.on("message", msg => {
        dispatch({ type: "MESSAGE", payload: msg })
      })

      socket.on("message_success", msg => {
        dispatch({ type: "MESSAGE_SUCCESS", payload: msg })
      })

      socket.on("online_users", ({ room, users }) => {
        if (room === roomId) {
          setOnlineUsers(users)
          getRoom(roomId)
        }
      })

      socket.on("error", error => {
        console.log(error)
      })

      socket.on("connect_timeout", () => {
        setConnected(socket.connected)
      })

      socket.on("connect_error", () => {
        setConnected(socket.connected)
      })

      socket.on("reconnect", () => {
        setConnected(socket.connected)
      })

      socket.on("reconnect_attempt", () => {
        setConnected(socket.connected)
      })

      socket.on("reconnect_error", () => {
        setConnected(socket.connected)
      })

      return () => socket.disconnect()
    }
  }, [socket])

  return {
    messages,
    connect,
    sendMessage,
    onlineUsers,
    room,
    connected,
  }
}

function messageReducer(state, action) {
  switch (action.type) {
    case "MESSAGE":
      return [...state, action.payload]
    case "MESSAGE_SUCCESS":
      return state.map(msg => (msg.status === "PENDING" ? action.payload : msg))
    case "INITIATE":
      return action.payload
    default:
      return state
  }
}

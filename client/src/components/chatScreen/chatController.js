import React, { useState, useEffect } from "react"

import Header from "../layouts/header"
import Hamburger from "../buttons/hamburger"
import RoomDisplay from "./header/roomDisplay"
import ThemeButton from "../buttons/themeButton"
import NotificationButton from "../buttons/notificationButton"

import UsersOverlay from "./usersOverlay/usersOverlay"
import GifOverlay from "./gifsOverlay/gifOverlay"

import ChatLayout from "./chatLayout"

import useChatSocket from "../../hooks/useChatSocket"
import { useUserContext } from "../../hooks/contextHooks"
import { OverlayProvider } from "../../context/OverlayContext"

const ChatController = () => {
  const [overlayVisible, setOverlayVisible] = useState("")

  const { user } = useUserContext()
  const {
    messages,
    sendMessage,
    hasMoreMessages,
    connect,
    connected,
    onlineUsers,
    room,
  } = useChatSocket(user)

  useEffect(() => {
    connect()
  }, [connect])

  const header = () => {
    return (
      <Header>
        <Hamburger
          checked={overlayVisible}
          onChange={() => setOverlayVisible(prev => toggleUserChecked(prev))}
        />
        <RoomDisplay
          room={room}
          onlineUsers={onlineUsers}
          connected={connected}
        />
        <NotificationButton />
        <ThemeButton />
      </Header>
    )
  }

  const overlays = checked => {
    switch (checked) {
      case "users":
        return (
          <UsersOverlay
            room={room}
            onlineUsers={onlineUsers}
            connected={connected}
          />
        )
      case "gifs":
        return <GifOverlay />
      default:
        return null
    }
  }

  return (
    <OverlayProvider
      overlays={overlays}
      value={{ overlayVisible, setOverlayVisible }}
    >
      <ChatLayout
        header={header}
        messages={messages}
        sendMessage={sendMessage}
        hasMoreMessages={hasMoreMessages}
        connected={connected}
      />
    </OverlayProvider>
  )
}

function toggleUserChecked(checked) {
  if (checked) return ""
  else return "users"
}

export default ChatController

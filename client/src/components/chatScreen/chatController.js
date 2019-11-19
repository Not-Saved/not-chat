import React, { useState, useEffect } from "react"

import Hamburger from "../buttons/hamburger"
import Overlay from "../layouts/overlay"
import Header from "../layouts/header"
import RoomDisplay from "./RoomDisplay"
import ChatOverlay from "./chatOverlay"
import ThemeButton from "../buttons/themeButton"
import NotificationButton from "../buttons/notificationButton"
import Chat from "./chat"

import { apiRequest } from "../../api"
import useSocket from "../../hooks/useSocket"
import { useUserContext } from "../../hooks/contextHooks"
const roomId = process.env.GATSBY_DEFAULT_ROOM || "5db0a60c89a5582114d5c2e3"

const ChatController = () => {
  const { user } = useUserContext()
  const {
    messages,
    sendMessage,
    connect,
    connected,
    onlineUsers,
    room,
  } = useSocket(user)

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const messages = await apiRequest({ url: `/rooms/${roomId}/messages` })
        connect(messages.data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [connect])

  const header = () => {
    return (
      <Header>
        <Hamburger
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
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

  return (
    <>
      <Chat
        header={header}
        messages={messages}
        sendMessage={sendMessage}
        connected={connected}
      />
      <Overlay visible={checked}>
        <ChatOverlay
          room={room}
          onlineUsers={onlineUsers}
          connected={connected}
        />
      </Overlay>
    </>
  )
}

export default ChatController

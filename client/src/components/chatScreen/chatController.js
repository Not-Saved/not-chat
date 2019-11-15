import React, { useState, useEffect } from "react"

import Hamburger from "../buttons/hamburger"
import Overlay from "../layouts/overlay"
import Header from "../layouts/header"
import ThemeButton from "../buttons/themeButton"
import Chat from "./chat"

import { apiRequest } from "../../api"
import useSocket from "../../hooks/useSocket"

const ChatController = () => {
  const { messages, sendMessage, connect, connected } = useSocket()

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    async function loadMessages() {
      const messages = await apiRequest({
        url: "/rooms/5db0a60c89a5582114d5c2e3/messages",
      })
      connect(messages.data)
    }
    loadMessages()
  }, [connect])

  const header = () => {
    return (
      <Header>
        <Hamburger
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
        />
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
      <Overlay visible={checked}></Overlay>
    </>
  )
}

export default ChatController

import React, { useState, useEffect } from "react"

import largeString from "../util/largeString"

import SEO from "../components/general/seo"
import Hamburger from "../components/buttons/hamburger"
import Overlay from "../components/layouts/overlay"
import Header from "../components/layouts/header"
import Chat from "../components/chatScreen/chat"
import ThemeButton from "../components/buttons/themeButton"

const ChatPage = () => {
  const [checked, setChecked] = useState(false)
  const [messages, setMessages] = useState(null)

  function loadMessages() {
    const messages = largeString
      .split("u")
      .slice(0, 500)
      .map((e, index) => {
        const from = index % 2 === 0 ? "Me" : "You"
        return { text: e, from: from }
      })
    setMessages(messages)
  }

  useEffect(() => {
    loadMessages()
  }, [])

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
    <div className="page container">
      <SEO title="Chat" />
      <Chat messages={messages} setMessages={setMessages} header={header} />
      <Overlay visible={checked}></Overlay>
    </div>
  )
}
export default ChatPage

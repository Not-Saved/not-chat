import React, { useState, useEffect } from "react"

import SEO from "../components/seo"
import Hamburger from "../components/hamburger"
import Overlay from "../components/overlay"
import Header from "../components/header"
import Chat from "../components/chat"
import largeString from "../util/largeString"
import ThemeButton from "../components/themeButton"

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

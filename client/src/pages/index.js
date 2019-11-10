import React, { useState } from "react"

import SEO from "../components/seo"
import Hamburger from "../components/hamburger"
import Overlay from "../components/overlay"
import Header from "../components/header"
import Chat from "../components/chat"
import largeString from "../util/largeString"

const SecondPage = () => {
  const [checked, setChecked] = useState(false)

  function loadMessages() {
    const messages = largeString
      .split("u")
      .slice(0, 300)
      .map((e, index) => {
        const from = index % 2 === 0 ? "Me" : "You"
        return { text: e, from: from }
      })
    console.log(messages.length)
    return messages
  }

  const header = () => {
    return (
      <Header>
        <Hamburger
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
        />
      </Header>
    )
  }

  return (
    <div className="page container">
      <SEO title="Chat" />
      <Chat initialMessages={loadMessages()} header={header} />
      <Overlay visible={checked}></Overlay>
    </div>
  )
}
export default SecondPage

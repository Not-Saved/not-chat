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
      .slice(0, 200)
      .map((e, index) => {
        const from = index % 2 === 0 ? "Me" : "You"
        return { text: e, from: from }
      })
    console.log(messages.length)
    return messages
  }

  return (
    <>
      <SEO title="Chat" />
      <Header>
        <Hamburger
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
        />
      </Header>
      <Chat initialMessages={loadMessages()} />
      <Overlay visible={checked}></Overlay>
    </>
  )
}
export default SecondPage

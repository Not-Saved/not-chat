import React, { useState } from "react"

import SEO from "../components/seo"
import Hamburger from "../components/hamburger"
import Overlay from "../components/overlay"
import Header from "../components/header"
import Input from "../components/input"
import ChatLayout from "../components/chatLayout"
import Message from "../components/message"

const SecondPage = () => {
  const [checked, setChecked] = useState(false)
  const [value, onChange] = useState("")
  const [messages, setMessages] = useState([])

  function handleMessage() {
    if (value) {
      setMessages(prev => [...prev, value])
    }
    onChange("")
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
      <ChatLayout>
        <Message text="Hello there" from="Mark" arrow />
        <Message
          text="What's upqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          from="Bob"
          mine
          arrow
        />
        <Message text="All good" from="Mark" />
        <Message
          text="How about you?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          from="Mark"
        />
        <Message text="Hello there" from="Mark" arrow />
        <Message
          text="What's upqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          from="Bob"
          mine
          arrow
        />
        <Message text="All good" from="Mark" />
        <Message
          text="How about you?eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          from="Mark"
          arrow
        />
        {messages.map((message, idx) => (
          <Message key={idx} from="Me" arrow text={message} mine />
        ))}
      </ChatLayout>
      <Input value={value} onChange={onChange} action={handleMessage} />
      <Overlay visible={checked}></Overlay>
    </>
  )
}
export default SecondPage

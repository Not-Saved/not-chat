import React, { useState, useRef, useEffect } from "react"

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
  const [wasBottom, setWasBottom] = useState(true)
  const wasBottomRef = useRef(wasBottom)
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  function handleMessage() {
    if (value) {
      setWasBottom(chatRef.current.isBottom())
      setMessages(prev => [...prev, value])
      onChange("")
    }
  }

  useEffect(() => {
    setMessages(prev => [...prev, "hello"])
  }, [])

  useEffect(() => {
    wasBottomRef.current && chatRef.current.toBottom()
  }, [messages])

  return (
    <>
      <SEO title="Chat" />
      <Header>
        <Hamburger
          checked={checked}
          onChange={() => setChecked(prev => !prev)}
        />
      </Header>
      <ChatLayout
        ref={chatRef}
        input={props => (
          <Input
            ref={inputRef}
            value={value}
            onChange={onChange}
            action={handleMessage}
            {...props}
          />
        )}
      >
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
        {messages.map((message, idx) => {
          const arrow =
            (messages[idx - 1] && messages[idx - 1].from !== message.from) ||
            messages.length === idx + 1
          return (
            <Message key={idx} from="Me" text={message} mine arrow={arrow} />
          )
        })}
      </ChatLayout>

      <Overlay visible={checked}></Overlay>
    </>
  )
}
export default SecondPage

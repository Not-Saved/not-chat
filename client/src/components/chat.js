import React, { useState, useRef, useEffect } from "react"
import Input from "../components/input"
import ChatLayout from "../components/chatLayout"
import MessageList from "./messageListVirtualized"

const Chat = ({ initialMessages, header }) => {
  const [value, onChange] = useState("")
  const [messages, setMessages] = useState(initialMessages)
  const [isBottom, setIsBottom] = useState(true)

  const chatRef = useRef(null)
  const inputRef = useRef(null)

  function handleMessage() {
    if (value) {
      onChange("")
      setIsBottom(true)
      chatRef.current.toBottom()
      setMessages(prev => [...prev, { text: value, from: "Me" }])
    }
  }

  const input = (
    <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      action={handleMessage}
    />
  )

  return (
    <ChatLayout header={header(chatRef)} input={input}>
      <MessageList
        ref={chatRef}
        messages={messages}
        isBottom={isBottom}
        setIsBottom={setIsBottom}
      />
    </ChatLayout>
  )
}

export default Chat

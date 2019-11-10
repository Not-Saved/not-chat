import React, { useState, useRef } from "react"
import Input from "../components/input"
import ChatLayout from "../components/chatLayout"
import MessageList from "./messageListVirtualized"
import PlaceholderList from "./placeholderList"

const Chat = ({ messages, setMessages, header }) => {
  const [value, onChange] = useState("")
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

  function renderContent() {
    if (messages) {
      return (
        <MessageList
          ref={chatRef}
          messages={messages}
          isBottom={isBottom}
          setIsBottom={setIsBottom}
        />
      )
    } else {
      return <PlaceholderList />
    }
  }

  return (
    <ChatLayout header={header(chatRef)} input={input}>
      {renderContent()}
    </ChatLayout>
  )
}

export default Chat

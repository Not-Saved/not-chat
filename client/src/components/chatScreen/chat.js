import React, { useState, useRef } from "react"
import Input from "./input"
import ChatLayout from "./chatLayout"
import MessageList from "./messageListVirtualized"
import PlaceholderList from "./placeholderList"

const Chat = ({ messages, sendMessage, connected, header }) => {
  const [value, onChange] = useState("")
  const [isBottom, setIsBottom] = useState(true)

  const chatRef = useRef(null)
  const inputRef = useRef(null)

  function handleMessage() {
    if (value.trim()) {
      onChange("")
      setIsBottom(true)
      chatRef.current.toBottom()
      sendMessage(value.trim())
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
    if (messages && connected) {
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

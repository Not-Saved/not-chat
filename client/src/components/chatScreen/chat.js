import React, { useState, useRef } from "react"
import Input from "./input"
import ChatLayout from "./chatLayout"
import MessageList from "./messageListVirtualized"
import LoadingChat from "./loadingChat"

const Chat = ({ messages, sendMessage, connected, header }) => {
  const [value, onChange] = useState("")
  const [isBottom, setIsBottom] = useState(true)

  const chatRef = useRef(null)
  const inputRef = useRef(null)

  function handleMessage() {
    if (value.trim()) {
      onChange("")
      setIsBottom(true)
      sendMessage(value.trim())
    }
  }

  const input = (
    <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      action={handleMessage}
      disabled={!messages || !connected}
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
      return (
        <LoadingChat
          loading={!messages || !connected}
          text={connected ? "Loading messages" : "Connecting"}
        />
      )
    }
  }

  return (
    <ChatLayout header={header(chatRef)} input={input}>
      {renderContent()}
    </ChatLayout>
  )
}

export default Chat

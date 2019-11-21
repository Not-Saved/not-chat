import React, { useState, useRef } from "react"

import MessageList from "./messageList/messageList"
import MessageListLoading from "./messageList/messageListLoading"
import Input from "./input/input"

import styles from "./chatLayout.module.css"

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
        <MessageListLoading
          loading={!messages || !connected}
          text={connected ? "Loading messages" : "Connecting"}
        />
      )
    }
  }

  return (
    <div className={styles.layout}>
      {header(chatRef)}
      <div className={styles.messages}>{renderContent()}</div>
      <div className={styles.input}>{input}</div>
    </div>
  )
}

export default Chat

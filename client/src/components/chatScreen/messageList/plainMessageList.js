import { debounce } from "lodash"
import React, { useRef, useImperativeHandle, useEffect, useState } from "react"
import { AutoSizer } from "react-virtualized"

import Message from "./message"
import DateMessage from "./dateMessage"
import MessageListLoading from "./messageListLoading"

import { useUserContext } from "../../../hooks/contextHooks"
import prepareMessages from "./prepareMessages"
import * as styles from "./messageList.module.css"

const MessageList = ({ messages, isBottom, setIsBottom }, ref) => {
  const { user } = useUserContext()
  const bottomRef = useRef(null)

  const [preparedMessages, setPreparedMessages] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)
  const [isLoading, setIsLoading] = useState(styles.loading)

  useImperativeHandle(ref, () => ({ toBottom: toBottom }))

  useEffect(() => {
    const lastMessage = messages.length && messages[messages.length - 1]
    if (lastMessage.user && lastMessage.user._id === user._id) {
      setIsBottom(true)
      toBottom()
    }
  }, [preparedMessages, messages, setIsBottom, user])

  useEffect(() => {
    console.log(isBottom)
  }, [isBottom])

  useEffect(() => {
    if (isLoading && preparedMessages.length) {
      setTimeout(() => {
        setIsLoading("")
        setIsBottom(true)
        bottomRef.current && bottomRef.current.scrollIntoView()
      }, 200)
    }
  }, [preparedMessages, isLoading, setIsBottom])

  useEffect(() => {
    const preparedMessages = prepareMessages(messages, user)
    setPreparedMessages(preparedMessages)
  }, [messages, user])

  function toBottom() {
    console.log("TO BOTTOM")
    bottomRef.current &&
      bottomRef.current.scrollIntoView(true, { behavior: "smooth" })
  }

  const hideScrollbar = debounce(() => setIsScrolling(""), 750)

  const handleScroll = e => {
    const { clientHeight, scrollHeight, scrollTop } = e.target
    setIsScrolling(styles.scrolling)
    setIsBottom(clientHeight === scrollHeight - scrollTop)
    hideScrollbar()
  }

  const handleResize = () => {
    isBottom && toBottom()
  }

  return (
    <>
      <MessageListLoading loading={isLoading} text="Loading messages" />
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <div
            className={[styles.plainList, isScrolling, isLoading].join(" ")}
            style={{ height, width }}
            onScroll={handleScroll}
          >
            {preparedMessages.map((message, idx) => (
              <div key={message._id || idx}>{renderMessage(message)}</div>
            ))}
            <span ref={bottomRef}></span>
          </div>
        )}
      </AutoSizer>
    </>
  )
}

function renderMessage(message) {
  switch (message.type) {
    case "USER_MESSAGE":
      return (
        <Message
          date={message.createdAt}
          text={message.content}
          from={message.user.userName}
          picture={`${message.user.picture}=s50`}
          mine={message.mine}
          arrow={message.arrow}
          status={message.status}
        />
      )
    case "DATE_MESSAGE":
      return <DateMessage text={message.content} />
    default:
      break
  }
}

export default React.forwardRef(MessageList)

import { debounce } from "lodash"
import React, { useRef, useImperativeHandle, useEffect, useState } from "react"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized"
import { Virtuoso } from "react-virtuoso"

import MessageListLoading from "./messageListLoading"
import Message from "./message"
import DateMessage from "./dateMessage"

import { useUserContext } from "../../../hooks/contextHooks"

import isMobile from "../../../util/isMobile"
import prepareMessages from "./prepareMessages"

import * as styles from "./messageList.module.css"

const measurerCache = new CellMeasurerCache({
  defaultHeight: 50,
  minHeight: 32,
  fixedWidth: true,
})

const MessageList = ({ messages, isBottom, setIsBottom }, ref) => {
  const { user } = useUserContext()
  const listRef = useRef(null)

  const [preparedMessages, setPreparedMessages] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)
  const [loading, setLoading] = useState("")

  useImperativeHandle(ref, () => ({ toBottom: toBottom }))

  useEffect(() => {
    measurerCache.clear(preparedMessages.length - 2, 0)
  }, [preparedMessages])

  useEffect(() => {
    const lastMessage = messages.length && messages[messages.length - 1]
    if (lastMessage.user && lastMessage.user._id === user._id) {
      toBottom(listRef, preparedMessages)
      setIsBottom(true)
    }
  }, [preparedMessages, messages, setIsBottom, user])

  useEffect(() => {
    const preparedMessages = prepareMessages(messages, user)
    setPreparedMessages(preparedMessages)
  }, [messages, user])

  function toBottom(listRef, messages) {
    function toBottomInner(ref) {
      ref && ref.scrollToIndex(messages.length - 1)
    }
    toBottomInner(listRef.current)
  }

  const hideScrollbar = debounce(() => setIsScrolling(""), 750)

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    setIsScrolling(styles.scrolling)
    setIsBottom(clientHeight === scrollHeight - scrollTop)
    hideScrollbar()
  }

  const handleResize = () => {
    if (isBottom) {
      toBottom(listRef, preparedMessages)
      setIsBottom(true)
    }
    if (!isMobile()) {
      measurerCache.clearAll()
    }
  }

  const onRowsRendered = debounce(e => {
    if (isBottom) {
      toBottom(listRef, preparedMessages)
      setIsBottom(true)
    }
    if (loading) {
      setTimeout(() => setLoading(""), 200)
    }
  }, 100)

  function getRow(index) {
    const message = preparedMessages[index]
    return (
      <div key={index} className={message.isLast}>
        {renderMessage(message)}
      </div>
    )
  }

  return (
    <>
      <MessageListLoading loading={loading} text="Loading messages" />
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <Virtuoso
            style={{ height, width }}
            ref={listRef}
            // onScroll={handleScroll}
            className={`${styles.list} ${isScrolling} ${loading}`}
            totalCount={preparedMessages.length}
            item={getRow}
            // itemsRendered={onRowsRendered}
            aria-label="message-list"
          ></Virtuoso>
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

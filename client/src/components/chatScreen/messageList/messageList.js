import { debounce } from "lodash"
import React, { useRef, useImperativeHandle, useEffect, useState } from "react"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized"

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

const MessageList = (
  { messages, isBottom, setIsBottom, hasMoreMessages },
  ref
) => {
  const { user } = useUserContext()
  const listRef = useRef(null)

  const [preparedMessages, setPreparedMessages] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)
  const [loading, setLoading] = useState(hasMoreMessages ? styles.loading : "")

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
      ref && ref.scrollToRow(messages.length - 1)
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

  function getRow({ index, key, style, parent }) {
    const message = preparedMessages[index]
    return (
      <CellMeasurer
        key={key}
        cache={measurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div key={key} className={message.isLast} style={style} role="row">
          {renderMessage(message)}
        </div>
      </CellMeasurer>
    )
  }

  return (
    <>
      <MessageListLoading loading={loading} text="Loading messages" />
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            ref={listRef}
            onScroll={handleScroll}
            className={`${styles.list} ${isScrolling} ${loading}`}
            rowCount={preparedMessages.length}
            rowHeight={measurerCache.rowHeight}
            overscanRowCount={10}
            estimatedRowSize={50}
            rowRenderer={getRow}
            deferredMeasurementCache={measurerCache}
            onRowsRendered={onRowsRendered}
            aria-label="message-list"
          ></List>
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
          picture={message.user.picture}
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

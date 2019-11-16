import { debounce } from "lodash"
import React, {
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
} from "react"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized"

import Message from "./message"
import styles from "./messageListVirtualized.module.css"
import isMobile from "../../util/isMobile"
import { useUserContext } from "../../hooks/contextHooks"
import DateMessage from "./dateMessage"

const measurerCache = new CellMeasurerCache({
  defaultHeight: 60,
  minHeight: 32,
  fixedWidth: true,
})

const MessageList = React.forwardRef(
  ({ messages, isBottom, setIsBottom }, ref) => {
    const { user } = useUserContext()

    const [preparedMessages, setPreparedMessages] = useState([])
    const [isScrolling, setIsScrolling] = useState(false)
    const listRef = useRef(null)

    useImperativeHandle(ref, () => ({ toBottom: toBottom }))

    const toBottom = useCallback(
      function toBottom() {
        if (listRef.current)
          listRef.current.scrollToRow(preparedMessages.length - 1)
      },
      [preparedMessages.length]
    )

    useEffect(() => {
      measurerCache.clear(preparedMessages.length - 2, 0)
      if (
        (preparedMessages.length &&
          preparedMessages[preparedMessages.length - 1].user._id ===
            user._id) ||
        isBottom
      ) {
        setTimeout(toBottom, 10)
      }
    }, [preparedMessages, isBottom, toBottom])

    useEffect(() => {
      const preparedMessages = prepareMessages(messages, user)
      setPreparedMessages(preparedMessages)
    }, [messages, user])

    const hideScrollbar = debounce(() => setIsScrolling(false), 1000)

    const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
      setIsScrolling(true)
      setIsBottom(clientHeight === scrollHeight - scrollTop)
      hideScrollbar()
    }

    const handleResize = () => {
      isBottom && toBottom()
      if (!isMobile()) measurerCache.clearAll()
    }

    function getRow(props) {
      const message = preparedMessages[props.index]
      return renderRow({ ...props, message })
    }

    const scrollClassName = isScrolling ? styles.scrolling : ""

    return (
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            ref={listRef}
            onScroll={handleScroll}
            className={`${styles.list} ${scrollClassName}`}
            rowCount={preparedMessages.length}
            rowHeight={measurerCache.rowHeight}
            overscanRowCount={5}
            rowRenderer={getRow}
            deferredMeasurementCache={measurerCache}
            aria-label="message-list"
          ></List>
        )}
      </AutoSizer>
    )
  }
)

export default MessageList

function renderRow({ index, key, style, parent, message }) {
  return (
    <CellMeasurer
      key={key}
      cache={measurerCache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {renderMessage(style, message)}
    </CellMeasurer>
  )
}

function renderMessage(style, message) {
  switch (message.type) {
    case "USER_MESSAGE":
      return (
        <div
          style={style}
          className={`${message.isFirst} ${message.isLast}`}
          role="row"
        >
          <Message
            date={message.createdAt}
            text={message.content}
            from={message.user.userName}
            mine={message.mine}
            arrow={message.arrow}
          />
        </div>
      )
    case "DATE_MESSAGE":
      return (
        <div style={style} role="row">
          <DateMessage text={message.content} />
        </div>
      )
    default:
      break
  }
}

function prepareMessages(messages, currentUser) {
  const preparedMessages = []
  messages.forEach((message, index) => {
    let user = message.user || { _id: null, userName: "Unknown" }
    let preparedMessage = { ...message }

    preparedMessage.type = "USER_MESSAGE"
    preparedMessage.user = user
    preparedMessage.createdAt = formatDate(message.createdAt)
    preparedMessage.mine = user._id === currentUser._id
    preparedMessage.arrow = checkIfArrow(messages, index, user)
    preparedMessage.isFirst = index === 0 ? styles.first : ""
    preparedMessage.isLast = index === messages.length - 1 ? styles.last : ""

    if (
      index === 0 ||
      (messages[index - 1] &&
        new Date(messages[index - 1].createdAt).getDay() !==
          new Date(message.createdAt).getDay())
    ) {
      const date = new Date(message.createdAt)
      const dateMessage = {
        type: "DATE_MESSAGE",
        content: date.toLocaleDateString("en", {
          month: "long",
          day: "numeric",
        }),
      }
      preparedMessages.push(dateMessage)
    }

    preparedMessages.push(preparedMessage)
  })
  return preparedMessages
}

function formatDate(date) {
  return new Date(date).toLocaleTimeString("it", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function checkIfArrow(messages, index, user) {
  if (messages.length === index + 1) {
    return true
  } else if (!messages[index + 1].user) {
    return true
  } else if (messages[index + 1].user._id === user._id) {
    return false
  } else {
    return true
  }
}

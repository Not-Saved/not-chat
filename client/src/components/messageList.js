import { debounce } from "lodash"
import React, { useRef, useImperativeHandle } from "react"
import { AutoSizer } from "react-virtualized"

import Message from "./message"
import styles from "./messageList.module.css"

const MessageList = React.forwardRef(
  ({ messages, isBottom, setIsBottom }, ref) => {
    const listRef = useRef(null)
    const bottomRef = useRef(null)

    useImperativeHandle(ref, () => ({
      toBottom: toBottom,
    }))

    function toBottom() {
      if (listRef.current) bottomRef.current.scrollIntoView()
    }

    const setBottom = debounce(() => {
      const { clientHeight, scrollHeight, scrollTop } = listRef.current
      setIsBottom(clientHeight === scrollHeight - scrollTop)
    }, 25)

    const handleResize = () => {
      isBottom && toBottom()
    }

    function getRow(message, index) {
      const arrow =
        (messages[index - 1] && messages[index - 1].from !== message.from) ||
        messages.length === index + 1
      const date = new Date().toLocaleTimeString("it", {
        hour: "2-digit",
        minute: "2-digit",
      })
      const isFirst = index === 0 ? styles.first : ""
      const isLast = index === messages.length - 1 ? styles.last : ""

      return (
        <div key={index} className={`${isFirst} ${isLast}`}>
          <Message date={date} text={message} from="Me" mine arrow={arrow} />
        </div>
      )
    }

    return (
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => {
          return (
            <div
              ref={listRef}
              onScroll={setBottom}
              className={styles.list}
              style={{ height, width }}
            >
              {messages.map(getRow)}
              <span ref={bottomRef}></span>
            </div>
          )
        }}
      </AutoSizer>
    )
  }
)

export default MessageList

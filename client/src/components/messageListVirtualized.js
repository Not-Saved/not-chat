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
import isMobile from "../util/isMobile"

const measurerCache = new CellMeasurerCache({
  defaultHeight: 52,
  minHeight: 49,
  fixedWidth: true,
})

const MessageList = React.forwardRef(
  ({ messages, isBottom, setIsBottom }, ref) => {
    const [isScrolling, setIsScrolling] = useState(false)
    const listRef = useRef(null)

    useImperativeHandle(ref, () => ({
      toBottom: toBottom,
    }))

    const toBottom = useCallback(
      function toBottom() {
        if (listRef.current) listRef.current.scrollToRow(messages.length - 1)
      },
      [messages.length]
    )

    useEffect(() => {
      measurerCache.clear(messages.length - 2, 0)
      isBottom && setTimeout(toBottom, 10)
    }, [messages, isBottom, toBottom])

    const hideScrollbar = debounce(() => setIsScrolling(false), 1000)

    const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
      setIsScrolling(true)
      setIsBottom(clientHeight === scrollHeight - scrollTop)
      hideScrollbar()
    }

    const handleResize = () => {
      if (!isMobile()) measurerCache.clearAll()
      isBottom && toBottom()
    }

    function getRow({ index, key, style, parent }) {
      const message = messages[index]
      const mine = message.from === "Me"

      const arrow =
        messages.length === 1 ||
        !messages[index + 1] ||
        (messages[index - 1] &&
          messages[index - 1].from !== message.from &&
          messages[index + 1].from !== message.from)

      const date = new Date().toLocaleTimeString("it", {
        hour: "2-digit",
        minute: "2-digit",
      })
      const isFirst = index === 0 ? styles.first : ""
      const isLast = index === messages.length - 1 ? styles.last : ""

      return (
        <CellMeasurer
          key={key}
          cache={measurerCache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={style} className={`${isFirst} ${isLast}`} role="row">
            <Message
              date={date}
              text={message.text.trim()}
              from={message.from}
              mine={mine}
              arrow={arrow}
            />
          </div>
        </CellMeasurer>
      )
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
            rowCount={messages.length}
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

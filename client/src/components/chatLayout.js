import React, { useRef, useImperativeHandle } from "react"

import styles from "./chatLayout.module.css"

const ChatLayout = React.forwardRef(({ input, children }, ref) => {
  const bottomRef = useRef(null)
  const layoutRef = useRef(null)

  useImperativeHandle(ref, () => ({
    toBottom: () => bottomRef.current.scrollIntoView(),
  }))

  return (
    <div ref={layoutRef} className={styles.layout}>
      <div className={styles.messages}>
        {children}
        <span ref={bottomRef}></span>
      </div>
      <div className={styles.input}>{input()}</div>
    </div>
  )
})

export default ChatLayout

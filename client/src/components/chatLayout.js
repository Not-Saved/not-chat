import React, { useRef, useImperativeHandle, useEffect } from "react"

import styles from "./chatLayout.module.css"

const ChatLayout = React.forwardRef(({ input, children }, ref) => {
  const bottomRef = useRef(null)
  const layoutRef = useRef(null)

  useImperativeHandle(ref, () => ({
    toBottom: toBottom,
    isBottom: isBottom,
  }))

  function isBottom() {
    return (
      layoutRef.current.clientHeight ===
      layoutRef.current.scrollHeight - layoutRef.current.scrollTop
    )
  }

  function toBottom() {
    bottomRef.current.scrollIntoView()
  }

  useEffect(() => {
    function onResize() {
      isBottom() && setTimeout(toBottom, 30)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div className={styles.layout}>
      <div ref={layoutRef} className={styles.messages}>
        {children}
        <span ref={bottomRef}></span>
      </div>
      <div className={styles.input}>{input({ isBottom, toBottom })}</div>
    </div>
  )
})

export default ChatLayout

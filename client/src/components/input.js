import React, { useImperativeHandle, useEffect, useRef } from "react"
import { FaAngleRight } from "react-icons/fa"

import styles from "./input.module.css"
import isMobile from "../util/isMobile"

const Input = React.forwardRef(({ value, onChange, action, ...rest }, ref) => {
  const isBottomRef = useRef(true)
  const inputRef = useRef()

  useImperativeHandle(ref, () => inputRef.current)

  function autoHeight() {
    inputRef.current.style.height = "auto"
    inputRef.current.style.height = inputRef.current.scrollHeight + "px"

    if (isBottomRef.current) {
      inputRef.current.scrollTop =
        inputRef.current.scrollHeight - inputRef.current.clientHeight
    }
  }

  useEffect(() => {
    autoHeight()
  }, [value])

  function handleChange(e) {
    onChange && onChange(e.target.value)
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (isMobile()) {
        onChange && onChange(e.target.value + "\n")
      } else {
        action && action(e.target.value)
      }
      inputRef.current.focus()
    }
  }

  function handleClick(e) {
    inputRef.current.focus()
    action && action()
  }

  function handleScroll() {
    isBottomRef.current =
      inputRef.current.scrollTop ===
      inputRef.current.scrollHeight - inputRef.current.clientHeight
  }

  return (
    <div className={styles.input}>
      <textarea
        ref={inputRef}
        onScroll={handleScroll}
        type="text"
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        maxLength={1000}
        placeholder="Message"
        {...rest}
      />
      <button className={styles.send} onClick={handleClick}>
        <FaAngleRight />
      </button>
    </div>
  )
})

export default Input

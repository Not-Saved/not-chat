import React, { useImperativeHandle, useEffect, useRef } from "react"
import { FiChevronRight } from "react-icons/fi"
import { IoIosAttach } from "react-icons/io"

import { useOverlay } from "../../../hooks/contextHooks"
import isMobile from "../../../util/isMobile"
import styles from "./input.module.css"

const Input = React.forwardRef(
  ({ value, onChange, action, disabled, ...rest }, ref) => {
    const { setOverlayVisible } = useOverlay()
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

    function handleSendClick(e) {
      inputRef.current.focus()
      action && action()
    }

    function handleMediaClick(e) {
      inputRef.current.focus()
      setOverlayVisible("gifs")
    }

    function handleScroll() {
      isBottomRef.current =
        inputRef.current.scrollTop ===
        inputRef.current.scrollHeight - inputRef.current.clientHeight
    }

    return (
      <div className={styles.input}>
        <textarea
          aria-label="message-textarea"
          ref={inputRef}
          onScroll={handleScroll}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength={1000}
          placeholder={disabled ? "Connecting..." : "Message"}
          disabled={disabled}
          {...rest}
        />
        <button className={styles.media} onClick={handleMediaClick}>
          <IoIosAttach />
        </button>
        <button className={styles.send} onClick={handleSendClick}>
          <FiChevronRight />
        </button>
      </div>
    )
  }
)

export default Input

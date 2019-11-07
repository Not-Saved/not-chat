import React, { useImperativeHandle, useEffect, useRef } from "react"
import { FaAngleRight } from "react-icons/fa"

import styles from "./input.module.css"

const Input = React.forwardRef(({ value, onChange, action, ...rest }, ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))

  function handleChange(e) {
    onChange && onChange(e.target.value)
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      action && action(e.target.value)
      inputRef.current.focus()
    }
  }

  function handleClick(e) {
    inputRef.current.focus()
    action && action()
  }

  function autoHeight() {
    inputRef.current.style.height = "auto"
    inputRef.current.style.height = inputRef.current.scrollHeight + "px"
  }

  useEffect(() => {
    autoHeight()
  }, [value])

  return (
    <div className={styles.input}>
      <textarea
        ref={inputRef}
        type="text"
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        maxLength={1000}
        {...rest}
      />
      <button className={styles.send} onClick={handleClick}>
        <FaAngleRight />
      </button>
    </div>
  )
})

export default Input

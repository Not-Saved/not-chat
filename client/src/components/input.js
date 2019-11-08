import React, {
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react"
import { FaAngleRight } from "react-icons/fa"

import styles from "./input.module.css"

const Input = React.forwardRef(
  ({ value, onChange, action, isBottom, toBottom, ...rest }, ref) => {
    const [wasBottom, setWasBottom] = useState(false)
    const inputRef = useRef()

    useImperativeHandle(ref, () => inputRef.current)

    const autoHeight = useCallback(() => {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = inputRef.current.scrollHeight + "px"
      wasBottom && toBottom()
    }, [wasBottom, toBottom])

    useEffect(() => {
      autoHeight()
    }, [value, autoHeight])

    function handleChange(e) {
      setWasBottom(isBottom)
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
          placeholder="Message"
          {...rest}
        />
        <button className={styles.send} onClick={handleClick}>
          <FaAngleRight />
        </button>
      </div>
    )
  }
)

export default Input

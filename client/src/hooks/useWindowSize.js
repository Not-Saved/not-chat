import { throttle } from "lodash"
import { useState, useEffect } from "react"

const isClient = typeof window === "object"

function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  }
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = throttle(function() {
      const size = getSize()
      setWindowSize(size)
      document.documentElement.style.setProperty("--height", `${size.height}px`)
      document.documentElement.style.setProperty("--width", `${size.width}px`)
    }, 100)

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}

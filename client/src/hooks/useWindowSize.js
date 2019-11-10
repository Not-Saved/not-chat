import { debounce } from "lodash"
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

    const handleResize = debounce(function() {
      const size = getSize()
      setWindowSize(size)
      document.documentElement.style.setProperty("--height", `${size.height}px`)
      document.documentElement.style.setProperty("--width", `${size.width}px`)
    }, 25)

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}

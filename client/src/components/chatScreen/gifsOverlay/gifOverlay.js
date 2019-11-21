import React, { useState, useEffect, useCallback, useRef } from "react"
import { debounce } from "lodash"

import Masonry from "../../gif/gifMasonry"
import { giphyRequest } from "../../../api"

import styles from "./gifOverlay.module.css"
import { useOverlay } from "../../../hooks/contextHooks"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const GifOverlay = () => {
  const { setOverlayVisible } = useOverlay()
  const inputRef = useRef()

  const [gifs, setGifs] = useState([])
  const [nextStop, setNextStop] = useState(0)
  const [value, setValue] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const isLoading = loading ? styles.loading : ""

  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 50)
  }, [])

  useEffect(() => {
    if (query) {
      getGifs(query)
    } else {
      getGifs()
    }
  }, [query])

  const debounceQuery = useCallback(
    debounce(q => {
      setQuery(q)
    }, 750),
    []
  )

  useEffect(() => {
    debounceQuery(value.trim())
  }, [value, debounceQuery])

  async function getGifsWithOffset(query = "", offset = 0) {
    try {
      const url = query ? undefined : "gifs/trending"
      const gifs = await giphyRequest(
        { q: query, limit: 50, offset: offset },
        url
      )
      setGifs(prev => [...prev, ...gifs.data.data])
    } catch (e) {
      console.error(e)
    }
  }

  async function getGifs(query = "") {
    try {
      setLoading(true)
      const url = query ? undefined : "gifs/trending"
      const gifs = await giphyRequest({ q: query, limit: 50, offset: 0 }, url)
      if (gifs.data.data.length) {
        setNextStop(0)
        setGifs(gifs.data.data)
      }
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.gifOverlay}>
      <div className={styles.masonry}>
        <div>
          <Masonry
            query={query}
            gifs={gifs}
            getGifs={getGifsWithOffset}
            onClick={e => setOverlayVisible("")}
            nextStop={nextStop}
            setNextStop={setNextStop}
            step={50}
          />
        </div>
      </div>
      <div className={styles.input}>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search Gif"
        />
        <AiOutlineLoading3Quarters className={`spin ${isLoading}`} />
      </div>
    </div>
  )
}

export default GifOverlay

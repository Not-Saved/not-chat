import React, { useState, useRef, useEffect } from "react"
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
} from "react-virtualized"

import styles from "./gifMasonry.module.css"
import Gif from "./gif"

const cache = new CellMeasurerCache({
  fixedWidth: true,
})

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 2,
  columnWidth: 0,
  spacer: 0,
})

const GifMasonry = ({
  query,
  gifs,
  getGifs,
  step,
  nextStop,
  setNextStop,
  onClick,
}) => {
  const masonryRef = useRef()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (nextStop === 0) {
      masonryRef.current.clearCellPositions()
      cellPositioner.reset({ columnWidth: width, columnCount: 2, spacer: 0 })
      cache.clearAll()
      setNextStop(step)
    }
  }, [width, query, gifs, step, nextStop, setNextStop])

  function cellRenderer({ index, key, parent, style, isScrolling }) {
    const gif = gifs[index]
    const datum = gifs[index].images.fixed_width_still
    const height = (width / datum.width) * datum.height
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div
          className={styles.cell}
          style={{ ...style, width: width }}
          key={key}
        >
          <Gif
            height={height}
            width={width}
            gif={gif}
            still={datum.url}
            isScrolling={isScrolling}
            onClick={onClick}
          />
        </div>
      </CellMeasurer>
    )
  }

  function handleResize({ width }) {
    const columnWidth = width / 2
    setWidth(columnWidth)
  }

  function onCellsRendered({ stopIndex }) {
    if (stopIndex + 1 > nextStop * 0.5) {
      getGifs(query, nextStop)
      setNextStop(prev => prev + step)
    }
  }

  return (
    <AutoSizer onResize={handleResize}>
      {({ height, width }) => (
        <Masonry
          className={styles.masonry}
          ref={masonryRef}
          cellCount={gifs.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          onCellsRendered={onCellsRendered}
          height={height}
          width={width}
        />
      )}
    </AutoSizer>
  )
}

export default GifMasonry

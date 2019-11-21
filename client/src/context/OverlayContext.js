import React from "react"
import Overlay from "../components/layouts/overlay"

export const OverlayContext = React.createContext({
  overlayVisible: "",
  setOverlayVisible: () => {},
})

export const OverlayProvider = ({ children, overlays, value }) => {
  return (
    <OverlayContext.Provider value={value}>
      <Overlay visible={value.overlayVisible}>
        {overlays(value.overlayVisible)}
      </Overlay>
      {children}
    </OverlayContext.Provider>
  )
}

export default OverlayContext

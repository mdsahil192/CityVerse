import React from "react"
import { Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { renderToString } from "react-dom/server"

interface MapMarkerProps {
  position: [number, number]
  iconNode?: React.ReactNode
  colorClass?: string
  children?: React.ReactNode
  onClick?: () => void
}

export function MapMarker({
  position,
  iconNode,
  colorClass = "bg-primary text-primary-foreground",
  children,
  onClick
}: MapMarkerProps) {
  
  const customIcon = React.useMemo(() => {
    // We use renderToString to convert the React node to HTML string for Leaflet's divIcon
    const htmlString = renderToString(
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-background cursor-pointer hover:scale-110 transition-transform ${colorClass}`}>
        {iconNode || <div className="w-3 h-3 rounded-full bg-current" />}
      </div>
    )

    return L.divIcon({
      html: htmlString,
      className: "custom-leaflet-icon", // transparent background
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    })
  }, [iconNode, colorClass])

  return (
    <Marker 
      position={position} 
      icon={customIcon}
      eventHandlers={{
        click: () => {
          if (onClick) onClick()
        }
      }}
    >
      {children && (
        <Popup className="cityverse-popup">
          {children}
        </Popup>
      )}
    </Marker>
  )
}

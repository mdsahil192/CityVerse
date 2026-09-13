import React from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { mapConfig } from "./mapConfig"
import { cn } from "@/lib/utils"

interface CityMapProps {
  center?: [number, number]
  zoom?: number
  className?: string
  children?: React.ReactNode
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

export function CityMap({
  center = mapConfig.defaultCenter,
  zoom = mapConfig.defaultZoom,
  className,
  children
}: CityMapProps) {
  const provider = mapConfig.providers[mapConfig.defaultProvider as keyof typeof mapConfig.providers]

  return (
    <div className={cn("w-full h-full relative z-0", className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={mapConfig.minZoom}
        maxZoom={mapConfig.maxZoom}
        className="w-full h-full absolute inset-0 outline-none"
        zoomControl={false}
      >
        <TileLayer
          attribution={provider.attribution}
          url={provider.url}
        />
        <MapUpdater center={center} zoom={zoom} />
        {children}
      </MapContainer>
    </div>
  )
}

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
})

interface MapComponentProps {
  places: Array<{
    id: number
    name: string
    latitude: number
    longitude: number
    category: string
  }>
  selectedPlaceId?: number | null
}

function MapUpdater({ selectedPlace, places }: { selectedPlace: any, places: any[] }) {
  const map = useMap()
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.latitude, selectedPlace.longitude], 15)
    } else if (places && places.length > 0) {
      const bounds = L.latLngBounds(places.map(p => [p.latitude, p.longitude]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
    } else {
      map.flyTo([28.6139, 77.2090], 12)
    }
  }, [selectedPlace, map, places])
  return null
}

export default function MapComponent({ places, selectedPlaceId }: MapComponentProps) {
  const selectedPlace = places.find(p => p.id === selectedPlaceId)
  
  // Start with first place or Delhi
  const defaultCenter: [number, number] = places.length > 0 
    ? [places[0].latitude, places[0].longitude] 
    : [28.6139, 77.2090]

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.latitude, place.longitude]}
          >
            <Popup>
              <div className="font-semibold">{place.name}</div>
              <div className="text-xs text-muted-foreground">{place.category}</div>
            </Popup>
          </Marker>
        ))}
        <MapUpdater selectedPlace={selectedPlace} places={places} />
      </MapContainer>
    </div>
  )
}

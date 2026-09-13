import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { HistoricalPlace } from "../../lib/forgotten-places-data"

// Create custom icons for different categories
const createIcon = (color: string, isLost: boolean = false) => {
  const fillClass = isLost ? 'fill-none' : `fill="${color}" opacity="0.6"`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 0px 4px ${color});"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 15.007 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" ${fillClass}/></svg>`;
  return L.divIcon({
    html: svg,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

const categoryColors: Record<string, string> = {
  Historical: "#f97316", // orange
  Demolished: "#ef4444", // red
  Abandoned: "#a855f7",  // purple
  Transformed: "#22c55e", // green
  Lost: "#9ca3af" // gray
}

interface HistoricalMapProps {
  places: HistoricalPlace[];
  selectedPlaceId: string | null;
  selectedYear: number;
  onSelectPlace: (id: string) => void;
}

function MapUpdater({ selectedPlace, places }: { selectedPlace: HistoricalPlace | null, places: HistoricalPlace[] }) {
  const map = useMap()
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.coordinates[0], selectedPlace.coordinates[1]], 16, { duration: 1.5 })
    } else if (places && places.length > 0) {
      const bounds = L.latLngBounds(places.map(p => [p.coordinates[0], p.coordinates[1]]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 1.5 })
    }
  }, [selectedPlace, map, places])
  return null
}

export default function HistoricalMap({ places, selectedPlaceId, selectedYear, onSelectPlace }: HistoricalMapProps) {
  // Filter places based on selectedYear
  const visiblePlaces = useMemo(() => {
    return places.filter(place => {
      if (selectedYear < place.startYear) return false;
      if (place.endYear && selectedYear > place.endYear) return false;
      return true;
    });
  }, [places, selectedYear]);

  const selectedPlace = places.find(p => p.id === selectedPlaceId) || null;
  const defaultCenter: [number, number] = [28.6139, 77.2090]; // Delhi

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {visiblePlaces.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.coordinates[0], place.coordinates[1]]}
            icon={createIcon(categoryColors[place.category], place.category === 'Lost')}
            eventHandlers={{
              click: () => onSelectPlace(place.id)
            }}
          >
            <Popup className="historical-popup">
              <div className="font-bold text-gray-900 text-sm mb-1">{place.name}</div>
              <div className="text-[10px] uppercase font-bold tracking-wider" style={{color: categoryColors[place.category]}}>
                {place.category}
              </div>
            </Popup>
          </Marker>
        ))}
        <MapUpdater selectedPlace={selectedPlace} places={visiblePlaces} />
      </MapContainer>
    </div>
  )
}

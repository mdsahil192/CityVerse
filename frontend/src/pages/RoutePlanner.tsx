import { useState, useMemo, useEffect } from "react"
import type { DropResult } from "@hello-pangea/dnd"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { motion, AnimatePresence } from "framer-motion"
import { GripVertical, X, Map as MapIcon, Navigation, Clock, Plus } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import L from "leaflet"

import { Button } from "../components/ui/button"
import { demoPlaces } from "../lib/data"

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
})

function RouteMapUpdater({ places }: { places: any[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(places.map(p => [p.latitude, p.longitude]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
    } else {
      map.setView([28.6139, 77.2090], 12) // Default Delhi
    }
  }, [places, map])
  
  return null
}

// Simple haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
  return R * c
}

export default function RoutePlanner() {
  const [routePlaces, setRoutePlaces] = useState<typeof demoPlaces>([])
  const [availablePlaces] = useState<typeof demoPlaces>(demoPlaces)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(routePlaces)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setRoutePlaces(items)
  }

  const addToRoute = (place: typeof demoPlaces[0]) => {
    if (!routePlaces.find(p => p.id === place.id)) {
      setRoutePlaces([...routePlaces, place])
    }
  }

  const removeFromRoute = (id: number) => {
    setRoutePlaces(routePlaces.filter(p => p.id !== id))
  }

  // Calculate route stats
  const stats = useMemo(() => {
    if (routePlaces.length < 2) return { distance: 0, time: 0 }
    
    let totalDist = 0
    for (let i = 0; i < routePlaces.length - 1; i++) {
      totalDist += calculateDistance(
        routePlaces[i].latitude, routePlaces[i].longitude,
        routePlaces[i+1].latitude, routePlaces[i+1].longitude
      )
    }
    
    // Assume average speed of 30 km/h in city traffic
    const totalTimeHours = totalDist / 30 
    
    return {
      distance: totalDist.toFixed(1),
      time: Math.round(totalTimeHours * 60) // in minutes
    }
  }, [routePlaces])

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] relative">
      {/* Mobile View Toggle */}
      <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-background rounded-full border shadow-lg p-1 flex">
        <Button 
          variant={viewMode === "list" ? "default" : "ghost"} 
          size="sm" 
          className="rounded-full px-6"
          onClick={() => setViewMode("list")}
        >
          <GripVertical className="h-4 w-4 mr-2" />
          Plan
        </Button>
        <Button 
          variant={viewMode === "map" ? "default" : "ghost"} 
          size="sm" 
          className="rounded-full px-6"
          onClick={() => setViewMode("map")}
        >
          <MapIcon className="h-4 w-4 mr-2" />
          Map
        </Button>
      </div>

      {/* Left Pane: Route Builder */}
      <div className={`w-full md:w-1/3 lg:w-[400px] bg-card border-r flex flex-col h-full z-10 transition-transform duration-300 ${viewMode === 'map' ? '-translate-x-full absolute md:relative md:translate-x-0' : 'translate-x-0'}`}>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold mb-2">Route Planner</h1>
          <p className="text-muted-foreground text-sm">Drag and drop to reorder your itinerary.</p>
          
          {routePlaces.length > 1 && (
            <div className="flex items-center gap-4 mt-6 bg-secondary/50 p-4 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="h-4 w-4 text-primary" />
                <span className="font-semibold">{stats.distance} km</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold">{formatTime(stats.time as number)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Route List */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Your Route ({routePlaces.length})</h3>
            
            {routePlaces.length === 0 ? (
              <div className="text-center p-8 border border-dashed rounded-xl bg-secondary/20">
                <p className="text-muted-foreground text-sm">Add places from the suggestions below to build your route.</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="route">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      <AnimatePresence>
                        {routePlaces.map((place, index) => (
                          <Draggable key={place.id.toString()} draggableId={place.id.toString()} index={index}>
                            {(provided) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-3 bg-background border rounded-xl p-3 shadow-sm group"
                              >
                                <div {...provided.dragHandleProps} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{place.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{place.category}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() => removeFromRoute(place.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Suggestions</h3>
            <div className="space-y-3">
              {availablePlaces.filter(p => !routePlaces.find(rp => rp.id === p.id)).map(place => (
                <div key={place.id} className="flex items-center justify-between gap-3 p-3 border rounded-xl hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={place.image_url} alt={place.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{place.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{place.category}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="secondary" className="h-8 w-8 shrink-0 rounded-full" onClick={() => addToRoute(place)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Map */}
      <div className={`flex-1 h-full z-0 transition-opacity duration-300 ${viewMode === 'list' ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto absolute md:relative w-full' : 'opacity-100 w-full'}`}>
        <MapContainer 
          center={[28.6139, 77.2090]} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RouteMapUpdater places={routePlaces} />
          
          {routePlaces.map((place, index) => (
            <Marker key={place.id} position={[place.latitude, place.longitude]}>
              <Popup className="cityverse-popup">
                <div className="p-1">
                  <div className="font-bold mb-1 flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    {place.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{place.category}</div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {routePlaces.length > 1 && (
            <Polyline 
              positions={routePlaces.map(p => [p.latitude, p.longitude])} 
              color="hsl(var(--primary))" 
              weight={4}
              dashArray="10, 10"
              className="opacity-70 animate-pulse"
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}

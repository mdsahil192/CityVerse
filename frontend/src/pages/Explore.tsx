import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Filter, SlidersHorizontal, Map as MapIcon, List as ListIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import MapComponent from "../components/map/MapComponent"
import PlaceCard from "../components/ui/PlaceCard"
import { demoPlaces } from "../lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../components/auth/AuthContext"

const categories = ["All", "Cafe", "Bar", "Park", "Museum", "Restaurant"]

export default function Explore() {
  const { session } = useAuth()
  const [searchParams] = useSearchParams()
  const initialMood = searchParams.get("mood")
  
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredPlaceId, setHoveredPlaceId] = useState<number | null>(null)
  const [selectedPlaceId] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "map">("list") // for mobile view
  
  const [savedPlaceIds, setSavedPlaceIds] = useState<Set<number>>(new Set())

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) {
        setSavedPlaceIds(new Set())
        return
      }
      try {
        const response = await fetch("http://localhost:8000/api/favorites/", {
          headers: { "Authorization": `Bearer ${session.access_token}` }
        })
        if (response.ok) {
          const favorites = await response.json()
          const ids = new Set<number>(favorites.map((fav: any) => fav.place.id))
          setSavedPlaceIds(ids)
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error)
      }
    }
    fetchFavorites()
  }, [session])

  const handleToggleSave = async (placeId: number) => {
    if (!session) {
      alert("Please sign in to save places!")
      return
    }
    
    const isCurrentlySaved = savedPlaceIds.has(placeId)
    
    // Optimistic UI update
    const newSaved = new Set(savedPlaceIds)
    if (isCurrentlySaved) {
      newSaved.delete(placeId)
    } else {
      newSaved.add(placeId)
    }
    setSavedPlaceIds(newSaved)

    try {
      await fetch(`http://localhost:8000/api/favorites/${placeId}`, {
        method: isCurrentlySaved ? "DELETE" : "POST",
        headers: { "Authorization": `Bearer ${session.access_token}` }
      })
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
      // Revert on error
      setSavedPlaceIds(savedPlaceIds)
    }
  }

  // Filter places
  const filteredPlaces = demoPlaces.filter(place => {
    if (activeCategory !== "All" && place.category !== activeCategory) return false
    if (searchQuery && !place.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden relative">
      {/* List View */}
      <div className={`w-full flex flex-col h-full bg-background z-10 
        ${viewMode === 'map' ? 'hidden' : 'flex'}`}>
        
        {/* Header & Filters */}
        <div className="p-4 border-b space-y-4 shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Input 
                  placeholder="Search by name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary/50 border-transparent rounded-lg"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-lg shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "secondary"}
                  size="sm"
                  className={`rounded-full px-4 shrink-0 text-xs h-7 transition-all duration-300 ${activeCategory === cat ? "bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white border-0 shadow-lg" : "hover:bg-primary/10 hover:text-primary"}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            
            {initialMood && (
              <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block mt-2">
                Showing places for mood: <span className="capitalize">{initialMood.replace("-", " ")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Places List */}
        <div className="flex-1 overflow-y-auto w-full">
          <motion.div 
            className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start max-w-7xl mx-auto pb-24"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <AnimatePresence>
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map(place => (
                  <motion.div
                    key={place.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Link to={`/place/${place.id}`}>
                      <PlaceCard 
                        place={place}
                        isSelected={selectedPlaceId === place.id || hoveredPlaceId === place.id}
                        isSaved={savedPlaceIds.has(place.id)}
                        onToggleSave={handleToggleSave}
                        onMouseEnter={() => setHoveredPlaceId(place.id)}
                        onMouseLeave={() => setHoveredPlaceId(null)}
                      />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-3xl bg-card/40 backdrop-blur-md col-span-full"
                >
                  <div className="bg-gradient-to-br from-pink-500 to-orange-400 p-4 rounded-full mb-4 shadow-lg shadow-pink-500/20">
                    <MapIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No places found</h3>
                  <p className="text-muted-foreground max-w-sm mb-6 text-sm">
                    Try adjusting your filters or search query to discover more amazing spots!
                  </p>
                  <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => {setSearchQuery(""); setActiveCategory("All")}}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Map View */}
      <div className={`w-full h-full relative
        ${viewMode === 'list' ? 'hidden' : 'block'}`}>
        <MapComponent 
          places={filteredPlaces} 
          selectedPlaceId={hoveredPlaceId || selectedPlaceId} 
        />
      </div>

      {/* View Toggle */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <Button 
          className="rounded-full shadow-xl bg-foreground text-background hover:bg-foreground/90 gap-2 h-12 px-6"
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          {viewMode === 'list' ? (
            <>
              <MapIcon className="h-4 w-4" />
              Show Map
            </>
          ) : (
            <>
              <ListIcon className="h-4 w-4" />
              Show List
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

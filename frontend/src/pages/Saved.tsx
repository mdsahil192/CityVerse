import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Map, HeartOff } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../components/auth/AuthContext"
import PlaceCard from "../components/ui/PlaceCard"
import { Button } from "../components/ui/button"

export default function Saved() {
  const { session } = useAuth()
  const [favorites, setFavorites] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return
      
      try {
        const response = await fetch("http://localhost:8000/api/favorites/", {
          headers: {
            "Authorization": `Bearer ${session.access_token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setFavorites(data)
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchFavorites()
  }, [session])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Places</h1>
          <p className="text-muted-foreground mt-1">Your personal collection of favorite spots</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-muted/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
            {favorites.map((fav) => (
              <motion.div
                key={fav.favorite_id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Link to={`/place/${fav.place.id}`}>
                  <PlaceCard 
                    place={fav.place}
                    isSelected={false}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                  />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl bg-card/40 backdrop-blur-md"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-br from-rose-500 to-pink-500 p-4 rounded-full mb-4 shadow-lg shadow-rose-500/20"
          >
            <HeartOff className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">No saved places yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Start exploring and click the heart icon on places you want to visit later!
          </p>
          <Button asChild className="rounded-full px-8 bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:opacity-90 transition-opacity border-0 shadow-lg text-white">
            <Link to="/explore">
              <Map className="mr-2 h-4 w-4" />
              Explore Places
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, ThermometerSun } from "lucide-react"
import { Card, CardContent, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function Neighborhoods() {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/neighborhoods")
        if (response.ok) {
          const data = await response.json()
          setNeighborhoods(data)
        }
      } catch (error) {
        console.error("Failed to fetch neighborhoods:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNeighborhoods()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pb-24 md:pb-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Neighborhood Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the unique vibes of different areas and find the perfect time to visit based on weather and events.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-[450px] bg-muted/50 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {neighborhoods.map((hood, idx) => (
            <motion.div
              key={hood.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden border border-primary/10 shadow-lg bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md h-full flex flex-col hover:shadow-2xl hover:border-primary/30 transition-all duration-500 rounded-3xl group">
                <div className="relative h-56 w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
                  {hood.stats?.image_url ? (
                    <img src={hood.stats.image_url} alt={hood.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <CardTitle className="text-3xl text-foreground drop-shadow-md">{hood.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {hood.stats?.vibe?.split(', ').map((vibe: string) => (
                        <Badge key={vibe} variant="secondary" className="bg-background/80 backdrop-blur-md">
                          {vibe}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="pt-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-8 text-primary font-medium bg-primary/10 w-fit px-4 py-2 rounded-full">
                    <ThermometerSun className="h-5 w-5" />
                    Best time: {hood.stats?.best_time}
                  </div>

                  <div className="mt-auto bg-gradient-to-br from-muted/30 to-muted/10 p-6 rounded-2xl border border-border/50 hover:border-primary/20 transition-colors duration-300">
                    <h4 className="text-sm font-semibold mb-6 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> 
                      Annual Activity & Weather Score
                    </h4>
                    
                    <div className="flex items-end justify-between h-32 gap-1 sm:gap-2">
                      {hood.stats?.timeline_data?.map((data: any) => (
                        <div key={data.month} className="flex flex-col items-center flex-1 group relative">
                          <div className="w-full relative h-32 flex items-end justify-center">
                            <div 
                              className={`w-full max-w-[28px] rounded-t-md transition-all duration-700 ease-out 
                                ${data.score >= 85 ? 'bg-primary' : data.score >= 50 ? 'bg-primary/50' : 'bg-primary/20'}`}
                              style={{ height: `${data.score}%` }}
                            >
                              {/* Tooltip */}
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1.5 px-2.5 rounded-lg shadow-xl pointer-events-none transition-all duration-200 z-10 whitespace-nowrap translate-y-2 group-hover:translate-y-0 font-medium">
                                Score: {data.score}
                              </div>
                            </div>
                          </div>
                          <span className={`text-[10px] sm:text-xs mt-3 font-semibold ${data.score >= 85 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {data.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState } from "react"
import { Calendar, MapPin, Search, Filter, CheckCircle2, Ticket } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

const demoEvents = [
  {
    id: 1,
    title: "Delhi Indie Music Festival",
    date: "Oct 15, 2026",
    time: "5:00 PM - 11:00 PM",
    location: "Sunder Nursery, New Delhi",
    category: "Music",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
    description: "Experience the best independent artists from across the country in a beautiful open-air setting."
  },
  {
    id: 2,
    title: "Heritage Walk: Old Delhi",
    date: "Oct 18, 2026",
    time: "7:00 AM - 10:00 AM",
    location: "Jama Masjid, Old Delhi",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    description: "A guided walk through the narrow lanes of Shahjahanabad exploring history and local food."
  },
  {
    id: 3,
    title: "Artisan Food Market",
    date: "Oct 22, 2026",
    time: "10:00 AM - 8:00 PM",
    location: "Dilli Haat, INA",
    category: "Food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    description: "Taste organic, handcrafted food products from local artisans and farmers."
  },
  {
    id: 4,
    title: "Tech Startup Mixer",
    date: "Oct 25, 2026",
    time: "6:30 PM - 9:30 PM",
    location: "Cyber Hub, Gurugram",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=800",
    description: "Meet founders, investors, and tech enthusiasts in an informal networking session."
  },
  {
    id: 5,
    title: "Kala Ghoda Arts Festival Preview",
    date: "Nov 12, 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Kala Ghoda, Mumbai",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    description: "A sneak peek into the upcoming arts festival featuring installations and performances."
  },
  {
    id: 6,
    title: "Bandra Food Walk",
    date: "Nov 15, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Carter Road, Mumbai",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    description: "Explore the best street food and cafes in the vibrant neighborhood of Bandra."
  }
]

const categories = ["All", "Music", "Culture", "Food", "Networking"]

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [rsvps, setRsvps] = useState<Set<number>>(new Set())

  const handleRsvp = (id: number) => {
    setRsvps(prev => {
      const newRsvps = new Set(prev)
      if (newRsvps.has(id)) {
        newRsvps.delete(id)
      } else {
        newRsvps.add(id)
      }
      return newRsvps
    })
  }

  const filteredEvents = demoEvents.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Discover Events</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Find the best local events, from indie concerts to heritage walks.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search events..." 
                className="pl-9 bg-card border-border/50 focus-visible:ring-1 rounded-full h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full shrink-0 h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className={`rounded-full shrink-0 ${activeCategory === category ? 'shadow-md' : 'bg-secondary/50 hover:bg-secondary'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={event.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 hover:border-border flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  {event.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="mt-auto pt-4 border-t flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(n => (
                      <div key={n} className="h-8 w-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${n + event.id}`} alt="User" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-medium">
                      +42
                    </div>
                  </div>
                  
                  <Button 
                    variant={rsvps.has(event.id) ? "secondary" : "default"}
                    className="rounded-full"
                    onClick={() => handleRsvp(event.id)}
                  >
                    {rsvps.has(event.id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        Going
                      </>
                    ) : (
                      <>
                        <Ticket className="h-4 w-4 mr-2" />
                        RSVP
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}

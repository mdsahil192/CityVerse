import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { forgottenPlaces } from "../lib/forgotten-places-data"
import HistoricalMap from "../components/forgotten-places/HistoricalMap"
import TimeSlider from "../components/forgotten-places/TimeSlider"
import ThenVsNow from "../components/forgotten-places/ThenVsNow"
import PlaceStory from "../components/forgotten-places/PlaceStory"
import DiscoveryCards from "../components/forgotten-places/DiscoveryCards"
import { X, History, MapPin, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function ForgottenPlaces() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = useMemo(() => {
    return forgottenPlaces.filter(place => 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedPlace = forgottenPlaces.find(p => p.id === selectedPlaceId);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#06102B] overflow-hidden relative font-sans">
      
      {/* Background Texture for historical feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-full relative z-10">
        
        {/* Left Side - Map & Controls */}
        <div className={`flex-1 flex flex-col h-full transition-all duration-500 ${selectedPlaceId ? 'lg:w-[60%] xl:w-[65%]' : 'w-full'}`}>
          
          {/* Header & Search */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#06102B]/80 backdrop-blur-md border-b border-white/5 z-20">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                <History className="h-6 w-6 text-orange-500" />
                Forgotten Places
              </h1>
              <p className="text-sm text-blue-200/60 uppercase tracking-widest mt-1">Discover what your city remembers</p>
            </div>
            
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/50" />
              <Input 
                placeholder="Search lost places..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 bg-white/5 border border-white/10 focus-visible:border-orange-500 rounded-full h-10 text-white placeholder:text-blue-200/50"
              />
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative p-4 md:p-6 pb-0 flex flex-col min-h-0">
            <HistoricalMap 
              places={filteredPlaces} 
              selectedPlaceId={selectedPlaceId} 
              selectedYear={selectedYear}
              onSelectPlace={setSelectedPlaceId}
            />
          </div>

          {/* Discovery Cards */}
          <div className="px-4 md:px-6 pb-4 shrink-0">
            <DiscoveryCards 
              places={filteredPlaces} 
              onSelectPlace={setSelectedPlaceId} 
            />
          </div>

          {/* Time Slider */}
          <div className="shrink-0 w-full">
            <TimeSlider 
              minYear={1900} 
              maxYear={2026} 
              selectedYear={selectedYear} 
              onChange={setSelectedYear} 
            />
          </div>
        </div>

        {/* Right Side - Details Panel */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute lg:relative right-0 top-0 w-full lg:w-[40%] xl:w-[35%] h-full bg-[#0A1633]/95 backdrop-blur-2xl border-l border-white/10 flex flex-col z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0 bg-[#06102B]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-orange-400">
                  <MapPin className="h-4 w-4" />
                  {selectedPlace.category} Place
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 text-white"
                  onClick={() => setSelectedPlaceId(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl font-black text-white mb-2 leading-tight">{selectedPlace.name}</h2>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-mono text-blue-200/80">
                      {selectedPlace.startYear} — {selectedPlace.endYear || 'Present'}
                    </span>
                    {selectedPlace.previousName && (
                      <span className="text-xs text-blue-200/50">Formerly: {selectedPlace.previousName}</span>
                    )}
                  </div>

                  {/* What is here today? */}
                  {selectedPlace.currentPlace && (
                    <div className="mb-8 p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
                      <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold mb-1">What is here today?</p>
                      <p className="text-white font-medium">{selectedPlace.currentPlace}</p>
                    </div>
                  )}

                  {/* Then Vs Now Component */}
                  <div className="mb-8">
                    <ThenVsNow 
                      historicalImage={selectedPlace.historicalImages[0]}
                      currentImage={selectedPlace.currentImages[0]}
                      historicalYear={selectedPlace.startYear}
                      currentYear={2026}
                    />
                  </div>

                  {/* Description & Significance */}
                  <div className="prose prose-invert max-w-none mb-10">
                    <p className="text-blue-100/80 text-lg leading-relaxed mb-6">
                      {selectedPlace.description}
                    </p>
                    <div className="p-6 rounded-2xl bg-orange-900/20 border border-orange-500/20 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                      <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Historical Significance
                      </h4>
                      <p className="text-blue-100/70 text-sm leading-relaxed">
                        {selectedPlace.historicalSignificance}
                      </p>
                    </div>
                  </div>

                  {/* Cinematic Timeline */}
                  <PlaceStory events={selectedPlace.timelineEvents} />
                  
                  {/* Sources */}
                  <div className="mt-12 pt-6 border-t border-white/10">
                    <p className="text-[10px] text-blue-200/40 uppercase tracking-widest mb-2">Sources & Archives</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.sources.map((source, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-blue-200/60">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

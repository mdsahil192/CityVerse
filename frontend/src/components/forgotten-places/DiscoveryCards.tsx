import { motion } from "framer-motion";
import type { HistoricalPlace } from "../../lib/forgotten-places-data";
import { ArrowRight, MapPin } from "lucide-react";

interface DiscoveryCardsProps {
  places: HistoricalPlace[];
  onSelectPlace: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Historical: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  Demolished: "text-red-400 border-red-500/30 bg-red-500/10",
  Abandoned: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  Transformed: "text-green-400 border-green-500/30 bg-green-500/10",
  Lost: "text-gray-400 border-gray-500/30 bg-gray-500/10"
}

export default function DiscoveryCards({ places, onSelectPlace }: DiscoveryCardsProps) {
  if (places.length === 0) return null;

  return (
    <div className="w-full mt-6">
      <h3 className="text-white font-bold text-lg mb-4 px-2 uppercase tracking-wider text-xs">Discover Forgotten Places</h3>
      <div className="w-full overflow-x-auto no-scrollbar pb-6">
        <div className="flex gap-4 min-w-max px-2">
          {places.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => onSelectPlace(place.id)}
              className="w-72 rounded-2xl bg-[#0A1633]/60 border border-white/10 hover:border-orange-500/50 p-4 flex flex-col gap-3 cursor-pointer group transition-all hover:bg-[#0A1633]/80 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] overflow-hidden relative"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                <img 
                  src={place.historicalImages[0]} 
                  alt={place.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-sm ${categoryColors[place.category]}`}>
                  {place.category}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold text-base truncate group-hover:text-orange-300 transition-colors">{place.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-blue-200/60 mt-1 uppercase tracking-wider">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{place.city} • {place.startYear} - {place.endYear || 'Present'}</span>
                </div>
              </div>
              
              <p className="text-xs text-blue-100/70 line-clamp-2 mt-1 flex-1">
                {place.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mt-2 group-hover:translate-x-1 transition-transform">
                <span>Explore Story</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

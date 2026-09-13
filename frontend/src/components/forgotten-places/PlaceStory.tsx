import { motion } from "framer-motion";
import type { TimelineEvent } from "../../lib/forgotten-places-data";

interface PlaceStoryProps {
  events: TimelineEvent[];
}

export default function PlaceStory({ events }: PlaceStoryProps) {
  return (
    <div className="w-full py-6 relative">
      <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Explore Story</h3>
      
      <div className="relative border-l-2 border-white/10 ml-4 pl-6 space-y-12 pb-8">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0A1633] border-2 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 font-mono inline-block">
                {event.year}
              </span>
              <h4 className="text-lg font-bold text-white leading-tight">{event.title}</h4>
              
              {event.image && (
                <div className="w-full h-32 rounded-lg overflow-hidden my-2 border border-white/10">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
                </div>
              )}
              
              <p className="text-sm text-blue-100/70 leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Cinematic fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06102B] to-transparent pointer-events-none"></div>
    </div>
  )
}

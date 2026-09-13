import { motion } from "framer-motion";

interface TimeSliderProps {
  minYear?: number;
  maxYear?: number;
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function TimeSlider({ minYear = 1900, maxYear = 2026, selectedYear, onChange }: TimeSliderProps) {
  const percentage = ((selectedYear - minYear) / (maxYear - minYear)) * 100;

  const decades = [];
  for (let y = minYear; y <= maxYear; y += 20) {
    if (y % 20 === 0) decades.push(y);
  }
  if (!decades.includes(maxYear)) decades.push(maxYear);

  return (
    <div className="w-full bg-[#0A1633]/80 backdrop-blur-xl border-y border-white/10 px-6 py-4 md:py-6 relative z-10 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl">Time Machine</h3>
            <p className="text-blue-200/60 text-xs uppercase tracking-widest">Adjust to see places from that era</p>
          </div>
          <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] font-mono">
            {selectedYear}
          </div>
        </div>

        <div className="relative h-12 flex items-center">
          {/* Track background */}
          <div className="absolute w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* Input Range */}
          <input 
            type="range" 
            min={minYear} 
            max={maxYear} 
            value={selectedYear} 
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          />

          {/* Thumb marker (visual only) */}
          <motion.div 
            className="absolute h-6 w-6 rounded-full bg-white border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] pointer-events-none z-10 flex items-center justify-center -translate-x-1/2"
            style={{ left: `${percentage}%` }}
            layout
          >
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          </motion.div>
        </div>

        {/* Labels */}
        <div className="flex justify-between w-full px-1">
          {decades.map((year) => (
            <div key={year} className="flex flex-col items-center">
              <div className={`w-0.5 h-2 mb-1 ${selectedYear >= year ? 'bg-orange-500' : 'bg-white/20'}`}></div>
              <span className={`text-[10px] md:text-xs font-mono transition-colors ${selectedYear >= year ? 'text-orange-300 font-bold' : 'text-blue-200/50'}`}>
                {year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

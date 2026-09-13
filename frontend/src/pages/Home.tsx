import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  ArrowRight, MapPin, Utensils, Calendar, 
  Sparkles, Flame, Mountain, Droplets, Moon, 
  Landmark, TreePine, Heart, Bot
} from "lucide-react"
import { Button } from "../components/ui/button"
import AnimatedStars from "../components/ui/AnimatedStars"

export default function Home() {
  return (
    <div className="flex-1 relative min-h-screen bg-[#06102B] overflow-hidden flex flex-col pt-20">
      
      {/* Background City Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=2400" 
          alt="City at night" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06102B] via-[#06102B]/60 to-[#06102B]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06102B] via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#06102B] via-transparent to-[#06102B] opacity-80"></div>
        <div className="absolute inset-0 bg-[#007BFF]/10 mix-blend-overlay"></div>
        
        {/* Animated Stars Layer */}
        <AnimatedStars />
        
        {/* Glowing Pin Placeholder - Center right */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] right-[35%] hidden lg:flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#007BFF] blur-2xl opacity-70 rounded-full scale-150"></div>
            <div className="w-10 h-14 bg-gradient-to-b from-[#00A3FF] to-[#007BFF] rounded-full flex items-center justify-center clip-pin relative z-10 shadow-[0_0_30px_rgba(0,163,255,0.8)] border border-white/40">
              <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
            </div>
          </div>
        </motion.div>
        
        {/* Glowing Text overlay near pin */}
        <div className="absolute top-[25%] right-[25%] text-blue-100/90 transform rotate-[-12deg] font-caveat text-3xl font-medium tracking-wide shadow-black drop-shadow-lg hidden lg:block whitespace-nowrap">
          Explore <br/> Beyond <br/> Boundaries
        </div>
        
        {/* Glowing Text overlay bottom right */}
        <div className="absolute bottom-[40%] right-[15%] text-blue-100/70 transform rotate-[-12deg] font-caveat text-3xl font-medium tracking-wide shadow-black drop-shadow-lg hidden xl:block whitespace-nowrap">
          Same Cities —<br/>New Perspectives
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col pb-32">
        <div className="container mx-auto px-6 pt-10 flex-1 flex flex-col lg:flex-row justify-between">
          
          {/* Left Column */}
          <div className="max-w-xl space-y-8 flex-col pt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#007BFF]/30 bg-[#007BFF]/10 backdrop-blur-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF] animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#00A3FF]">A Smarter Way to Explore</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.05]">
                Your City. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#007BFF] drop-shadow-[0_0_25px_rgba(0,163,255,0.4)]">
                  Your Way.
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-blue-100/80 max-w-lg leading-relaxed font-medium"
            >
              Discover hidden places, explore neighborhoods, build unforgettable routes, and experience your city differently.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Button className="rounded-full h-12 px-8 text-sm font-semibold shadow-[0_0_20px_rgba(0,123,255,0.4)] hover:shadow-[0_0_30px_rgba(0,123,255,0.6)] transition-all bg-gradient-to-r from-[#007BFF] to-[#00A3FF] text-white border-0 w-full sm:w-auto" asChild>
                <Link to="/city/1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  View City Intelligence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full h-12 px-8 text-sm font-semibold border-white/10 text-white hover:bg-white/10 transition-all bg-[#0A1633]/60 backdrop-blur-sm w-full sm:w-auto" asChild>
                <Link to="/explore">
                  Explore Places
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-6"
            >
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-[#00A3FF]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">1K+</p>
                    <p className="text-[10px] text-blue-200/60 uppercase font-medium">Cities</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-[#00A3FF]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">50K+</p>
                    <p className="text-[10px] text-blue-200/60 uppercase font-medium">Places</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-[#00A3FF]">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">10K+</p>
                    <p className="text-[10px] text-blue-200/60 uppercase font-medium">Events</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-[#00A3FF]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">100K+</p>
                    <p className="text-[10px] text-blue-200/60 uppercase font-medium">Explorers</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-blue-200/60 font-medium mb-3">Popular this week</p>
                <div className="flex gap-4">
                  {[
                    {name: "Delhi", img: "1"}, 
                    {name: "Mumbai", img: "2"}, 
                    {name: "Bengaluru", img: "3"}, 
                    {name: "Hyderabad", img: "4"},
                    {name: "Pune", img: "5"}
                  ].map((city) => (
                    <div key={city.name} className="flex items-center gap-2 bg-[#0A1633]/60 border border-white/10 rounded-full pr-3 pl-1 py-1 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
                      <img src={`https://i.pravatar.cc/100?img=${city.img}0`} alt={city.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-[10px] text-white font-medium">{city.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Floating Chat Bubble */}
          <div className="hidden xl:flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-[#0A1633]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,123,255,0.2)] w-72 relative"
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#0A1633]/70 border-l border-b border-white/20 transform rotate-45 backdrop-blur-xl"></div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#007BFF]/20 rounded-full text-[#00A3FF]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Not just places, <br/>but stories.</h4>
                  <p className="text-[10px] text-blue-200/70">See your city in a new light.</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#007BFF]/20 flex items-center justify-center text-[#00A3FF]">
                <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:flex flex-col gap-6 pt-10">
            {/* Weather Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#0A1633]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl w-72 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-4">
                  <MapPin className="h-4 w-4" />
                  New Delhi
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-5xl font-bold text-white mb-1">28°C</h2>
                    <p className="text-blue-100/70 text-sm">Mostly Clear</p>
                  </div>
                  <Moon className="h-10 w-10 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" fill="currentColor" />
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <p className="text-xs text-blue-100/70">H: 32° L: 24° | AQI 142</p>
                  <Button size="icon" className="h-6 w-6 rounded-full bg-[#007BFF] hover:bg-[#007BFF]/80 shadow-[0_0_10px_rgba(0,123,255,0.5)] border-0">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Cities Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#0A1633]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl w-72 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/10 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
                <p className="text-blue-100/80 text-xs font-medium mb-4">Cities Worldwide</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A1633] overflow-hidden bg-secondary">
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#0A1633] bg-[#007BFF]/20 text-[#00A3FF] flex items-center justify-center text-xs font-bold backdrop-blur-sm">
                      +
                    </div>
                  </div>
                  
                  <Button size="icon" className="h-6 w-6 rounded-full bg-[#007BFF] hover:bg-[#007BFF]/80 shadow-[0_0_10px_rgba(0,123,255,0.5)] border-0">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Forgotten Places Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full mt-24 mb-12 relative container mx-auto px-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
            {/* Background Image - Past */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1506544777-626a58b299e9?auto=format&fit=crop&q=80&w=2400&sat=-100" 
                alt="Historical City" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06102B] via-[#06102B]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-orange-900/10 mix-blend-color"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400">Time Travel Experience</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Every city has places it forgot.
                </h2>
                <p className="text-blue-100/70 text-lg mb-8 font-medium">
                  Explore what once stood here. Discover demolished buildings, lost markets, and abandoned monuments.
                </p>
                
                <Button className="rounded-full h-12 px-8 text-sm font-semibold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0" asChild>
                  <Link to="/forgotten-places">
                    Start Journey: TODAY → PAST
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Decorative elements */}
              <div className="hidden md:flex flex-col gap-4 text-orange-200/50 font-mono text-xs text-right opacity-60">
                <p>LAT: 28.6139° N</p>
                <p>LNG: 77.2090° E</p>
                <p>ERA: 1920-2026</p>
                <p>RECORDS: 124,592</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Curved Glass Section */}
        <motion.div 
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full mt-12 relative"
        >
          {/* Arc shape border top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] border-t border-white/10 rounded-t-[50%] bg-gradient-to-b from-[#0A1633]/80 to-[#06102B] backdrop-blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 container mx-auto px-6 pt-12 pb-8 flex flex-col items-center">
            
            {/* Small drag handle indicator */}
            <div className="w-12 h-1.5 bg-cyan-400/50 rounded-full mb-8 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                Explore by <span className="text-[#00A3FF] drop-shadow-[0_0_10px_rgba(0,163,255,0.5)]">Mood</span>
              </h2>
              <p className="text-sm text-blue-200/70">
                Not sure where to go? Let your current vibe guide you to the perfect spots.
              </p>
            </div>

            {/* Horizontal Scroll Cards */}
            <div className="w-full overflow-x-auto no-scrollbar pb-6">
              <div className="flex gap-4 min-w-max px-4">
                
                {/* Trending Card (Active) */}
                <Link to="/explore?mood=trending">
                  <div className="w-40 h-40 rounded-2xl bg-[#007BFF]/10 border border-[#00A3FF] p-5 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00A3FF]/20 to-transparent opacity-50"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#00A3FF] blur-sm"></div>
                    
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                      <Flame className="h-5 w-5 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" fill="currentColor" />
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <h4 className="text-white font-bold text-sm mb-1">Trending</h4>
                      <p className="text-[9px] text-blue-200/70">What's hot right now</p>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-[#007BFF]/30 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </Link>

                {/* Other Cards */}
                {[
                  { title: "Foodie", subtitle: "Great food, better moods", icon: Utensils, color: "text-pink-400" },
                  { title: "Adventure", subtitle: "Trails, thrills, and more", icon: Mountain, color: "text-green-400" },
                  { title: "Peaceful", subtitle: "Calm places, clear mind", icon: Droplets, color: "text-cyan-400" },
                  { title: "Nightlife", subtitle: "Cities after dark", icon: Moon, color: "text-indigo-400" },
                  { title: "Cultural", subtitle: "History comes alive", icon: Landmark, color: "text-amber-400" },
                  { title: "Nature", subtitle: "Green escapes", icon: TreePine, color: "text-emerald-400" },
                  { title: "Romantic", subtitle: "Perfect for two", icon: Heart, color: "text-rose-400" }
                ].map((mood) => {
                  const Icon = mood.icon
                  return (
                    <Link key={mood.title} to={`/explore?mood=${mood.title.toLowerCase()}`}>
                      <div className="w-40 h-40 rounded-2xl bg-[#0A1633]/60 border border-white/5 hover:border-white/20 p-5 flex flex-col justify-between relative overflow-hidden transition-all group">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Icon className={`h-5 w-5 ${mood.color}`} />
                        </div>
                        
                        <div className="relative z-10 text-center">
                          <h4 className="text-white/90 font-bold text-sm mb-1">{mood.title}</h4>
                          <p className="text-[9px] text-blue-200/50">{mood.subtitle}</p>
                        </div>
                        
                        <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <ArrowRight className="h-3 w-3 text-white/50" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Footer Text */}
            <div className="mt-6 flex items-center justify-center gap-3 text-[10px] text-blue-200/50 uppercase tracking-widest font-medium">
              <span>More than a map</span>
              <span className="w-1 h-1 rounded-full bg-[#00A3FF]"></span>
              <span>A Universe of Cities</span>
              <span className="w-1 h-1 rounded-full bg-[#00A3FF]"></span>
              <span>Powered by People</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Chatbot */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      >
        <div className="bg-[#0A1633]/80 backdrop-blur-md border border-white/10 rounded-xl py-2 px-4 shadow-lg hidden md:block">
          <p className="text-[10px] text-white font-medium">Need suggestions?</p>
          <p className="text-[9px] text-blue-200/70">I'm here to help!</p>
        </div>
        <button className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00A3FF] to-[#007BFF] shadow-[0_0_25px_rgba(0,163,255,0.6)] flex items-center justify-center text-white hover:scale-110 transition-transform border-2 border-white/20">
          <div className="relative">
            <Bot className="h-6 w-6" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-[#007BFF]"></div>
          </div>
        </button>
      </motion.div>
    </div>
  )
}

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, MapPin, User, Calendar, LogOut, Home, Navigation, Sun, Moon, Hexagon, Heart, History } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAuth } from "../auth/AuthContext"
import { AuthModal } from "../auth/AuthModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function Navbar() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isDark, setIsDark] = useState(true) // Default to dark for this theme
  
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
    const previous = scrollY.getPrevious() ?? 0
    if (latest > 150 && latest > previous) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  
  const isHome = location.pathname === '/'
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 z-50 w-full hidden md:block transition-all duration-300 ${
          !isHome || scrolled 
            ? 'bg-[#0A1633]/95 backdrop-blur-md border-b border-white/10 py-4' 
            : 'bg-transparent pt-6 pb-2'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6 gap-8">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative flex items-center justify-center h-10 w-10 text-cyan-400">
              <Hexagon className="absolute h-10 w-10 fill-cyan-400/20 stroke-cyan-400" strokeWidth={1.5} />
              <div className="absolute w-4 h-6 bg-cyan-400 rounded-sm skew-y-12 translate-x-1"></div>
              <div className="absolute w-4 h-6 bg-blue-500 rounded-sm -skew-y-12 -translate-x-1"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-white leading-none">CITYVERSE</span>
              <span className="text-[9px] text-blue-200/70 tracking-widest mt-1">Explore • Discover • Belong</span>
            </div>
          </Link>
          
          <div className="flex-1 max-w-xl ml-8">
            <div className="relative group flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-blue-200/50 group-focus-within:text-cyan-400 transition-colors z-10" />
              <Input 
                placeholder="Search places, neighborhoods, or moods..." 
                className="w-full pl-11 pr-16 bg-[#007BFF]/10 hover:bg-[#007BFF]/15 border border-[#007BFF]/20 focus-visible:border-cyan-400 focus-visible:ring-0 rounded-full h-11 shadow-inner transition-all text-white placeholder:text-blue-200/50"
              />
              <div className="absolute right-4 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-blue-400/20 bg-blue-500/10 px-1.5 font-mono text-[10px] font-medium text-blue-200/70">
                  Ctrl
                </kbd>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-blue-400/20 bg-blue-500/10 px-1.5 font-mono text-[10px] font-medium text-blue-200/70">
                  K
                </kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link to="/explore" className={`flex items-center gap-2 transition-colors ${location.pathname === '/explore' ? 'text-cyan-400 font-semibold' : 'text-blue-100/80 hover:text-white'}`}>
              <Home className="h-4 w-4" />
              Explore
            </Link>
            <Link to="/forgotten-places" className={`flex items-center gap-2 transition-colors ${location.pathname === '/forgotten-places' ? 'text-cyan-400 font-semibold' : 'text-blue-100/80 hover:text-white'}`}>
              <History className="h-4 w-4" />
              Forgotten
            </Link>
            <Link to="/neighborhoods" className={`flex items-center gap-2 transition-colors ${location.pathname === '/neighborhoods' ? 'text-cyan-400 font-semibold' : 'text-blue-100/80 hover:text-white'}`}>
              <MapPin className="h-4 w-4" />
              Areas
            </Link>
            <Link to="/routes" className={`flex items-center gap-2 transition-colors ${location.pathname === '/routes' ? 'text-cyan-400 font-semibold' : 'text-blue-100/80 hover:text-white'}`}>
              <Navigation className="h-4 w-4" />
              Routes
            </Link>
            <Link to="/events" className={`flex items-center gap-2 transition-colors ${location.pathname === '/events' ? 'text-cyan-400 font-semibold' : 'text-blue-100/80 hover:text-white'}`}>
              <Calendar className="h-4 w-4" />
              Events
            </Link>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-4">
              <button onClick={() => setIsDark(!isDark)} className="text-blue-100/80 hover:text-white transition-colors">
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-white/20 bg-[#0A1633]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 font-bold">
                        {(user.username || user.mobile || '?').charAt(0).toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#0F1A33] border-white/10 text-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.username || user.mobile}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                      <Link to="/saved">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Saved</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-400 focus:text-red-400 focus:bg-white/10 cursor-pointer hover:bg-white/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded-full px-7 h-10 bg-white text-black hover:bg-white/90 font-semibold flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header (Search only) */}
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 z-50 w-full bg-[#0A1633]/90 backdrop-blur-md md:hidden px-4 py-3 border-b border-white/10"
      >
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/50" />
          <Input 
            placeholder="Search places..." 
            className="w-full pl-10 bg-[#007BFF]/10 border border-[#007BFF]/20 focus-visible:border-cyan-400 rounded-full h-10 text-white placeholder:text-blue-200/50"
          />
        </div>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

import { Outlet, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "./Navbar"

export default function MainLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Global Subtle Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/15 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-500/10 dark:bg-pink-500/15 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className={`flex-1 flex flex-col pb-16 md:pb-0 w-full ${location.pathname !== '/' ? 'pt-24' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import MainLayout from "./components/layout/MainLayout"
import PageTransition from "./components/layout/PageTransition"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import PlaceDetails from "./pages/PlaceDetails"
import { AuthProvider } from "./components/auth/AuthContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import Saved from "./pages/Saved"
import Neighborhoods from "./pages/Neighborhoods"
import RoutePlanner from "./pages/RoutePlanner"
import Events from "./pages/Events"
import ForgottenPlaces from "./pages/ForgottenPlaces"

const queryClient = new QueryClient()

// Placeholders for future phases
const Profile = () => <div className="p-8 text-center text-xl font-bold">User Profile (Phase 12)</div>

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="explore" element={<PageTransition><Explore /></PageTransition>} />
          <Route path="neighborhoods" element={<PageTransition><Neighborhoods /></PageTransition>} />
          <Route path="routes" element={<PageTransition><RoutePlanner /></PageTransition>} />
          <Route path="events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="forgotten-places" element={<PageTransition><ForgottenPlaces /></PageTransition>} />
          <Route path="place/:id" element={<PageTransition><PlaceDetails /></PageTransition>} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="saved" element={<PageTransition><Saved /></PageTransition>} />
            <Route path="profile" element={<PageTransition><Profile /></PageTransition>} />
          </Route>
          
          <Route path="*" element={<PageTransition><div className="p-8 text-center">404 - Page Not Found</div></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

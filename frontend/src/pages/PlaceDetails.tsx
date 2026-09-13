import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  ArrowLeft, Star, MapPin, Clock, Phone, 
  Share2, Heart, Check
} from "lucide-react"
import { Button } from "../components/ui/button"
import { demoPlaces } from "../lib/data"
import MapComponent from "../components/map/MapComponent"
import { useAuth } from "../components/auth/AuthContext"
import ReviewForm from "../components/reviews/ReviewForm"
import ReviewBreakdown from "../components/reviews/ReviewBreakdown"

export default function PlaceDetails() {
  const { id } = useParams()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const { session } = useAuth()
  const [place, setPlace] = useState<any>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [reviews, setReviews] = useState<any[]>([])
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    if (id) {
      const found = demoPlaces.find(p => p.id === parseInt(id))
      setPlace(found)
      
      // Fetch reviews
      fetch(`http://localhost:8000/api/reviews/${id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setReviews(data)
          }
        })
        .catch(err => console.error("Failed to fetch reviews:", err))
    }
  }, [id])

  useEffect(() => {
    // Check if favorited
    const checkFavorite = async () => {
      if (!session || !id) return
      try {
        const response = await fetch("http://localhost:8000/api/favorites/", {
          headers: { "Authorization": `Bearer ${session.access_token}` }
        })
        if (response.ok) {
          const favorites = await response.json()
          setIsSaved(favorites.some((fav: any) => fav.place.id === parseInt(id)))
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error)
      }
    }
    checkFavorite()
  }, [session, id])

  const toggleFavorite = async () => {
    if (!session) {
      alert("Please sign in to save places!")
      return
    }
    if (isSaving || !id) return
    
    setIsSaving(true)
    try {
      if (isSaved) {
        await fetch(`http://localhost:8000/api/favorites/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${session.access_token}` }
        })
        setIsSaved(false)
      } else {
        await fetch(`http://localhost:8000/api/favorites/${id}`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${session.access_token}` }
        })
        setIsSaved(true)
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleGetDirections = () => {
    if (!place) return;
    
    const destinationUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${place.latitude},${place.longitude}`, '_blank');
        },
        (error) => {
          console.warn("Geolocation failed, falling back to destination-only map.", error);
          window.open(destinationUrl, '_blank');
        }
      );
    } else {
      window.open(destinationUrl, '_blank');
    }
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-pulse">Loading place details...</div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      {/* Top Nav for mobile/back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/explore">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 ${isSaved ? "text-rose-500" : "text-muted-foreground"}`}
            onClick={toggleFavorite}
            disabled={isSaving}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Image Gallery Header */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-muted overflow-hidden">
        <motion.img 
          style={{ y, scale: 1.1 }}
          src={place.images ? place.images[activeImage] : place.image_url} 
          alt={place.name} 
          className="w-full h-full object-cover origin-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {place.images && place.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {place.images.map((_: any, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === activeImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left side on desktop) */}
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-primary mb-2 font-medium">
                    <span className="bg-primary/10 px-2 py-1 rounded-md">{place.category}</span>
                    <span>•</span>
                    <span>{place.price_level}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{place.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{place.address || 'Delhi, India'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-500 px-3 py-2 rounded-xl">
                  <span className="font-bold text-lg">{place.rating}</span>
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                <p>{place.description}</p>
              </div>
            </motion.div>

            {/* Amenities Section */}
            {place.amenities && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold">What this place offers</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                  {place.amenities.map((amenity: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 pt-4 border-t"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Reviews</h3>
                {!showReviewForm && (
                  <Button variant="outline" onClick={() => setShowReviewForm(true)}>
                    Write a review
                  </Button>
                )}
              </div>
              
              {showReviewForm && (
                <ReviewForm 
                  placeId={parseInt(id!)} 
                  onCancel={() => setShowReviewForm(false)}
                  onReviewSubmitted={(newReview) => {
                    setReviews(prev => [...prev, newReview])
                    setShowReviewForm(false)
                  }}
                />
              )}
              
              <ReviewBreakdown reviews={reviews} />
              
              <div className="space-y-4 mt-6">
                {reviews.map((review: any) => (
                  <div key={review.id} className="bg-muted/30 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {String(review.user_name || review.user_id || "?").charAt(0).toUpperCase()}
                        </div>
                        {review.user_name || review.user_id}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{review.rating}.0</span>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar (Right side on desktop) */}
          <div className="w-full lg:w-[350px] space-y-6 shrink-0">
            {/* Quick Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border rounded-2xl p-6 shadow-sm space-y-6 sticky top-24"
            >
              <div className="space-y-4">
                {place.timings && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Opening Hours</div>
                      <div className="text-sm text-muted-foreground">{place.timings}</div>
                    </div>
                  </div>
                )}
                
                {place.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Contact</div>
                      <div className="text-sm text-muted-foreground">{place.phone}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleGetDirections}
                className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:opacity-90 transition-opacity border-0 shadow-lg text-white"
              >
                Get Directions
              </Button>
              
              {/* Map Preview */}
              <div className="h-48 w-full rounded-xl overflow-hidden border">
                <MapComponent places={[place]} selectedPlaceId={place.id} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

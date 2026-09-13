import { Star, MapPin, Heart } from "lucide-react"

interface PlaceCardProps {
  place: {
    id: number
    name: string
    description: string
    category: string
    price_level: string
    rating: number
    image_url: string
  }
  isSelected?: boolean
  isSaved?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onToggleSave?: (id: number) => void
}

export default function PlaceCard({ 
  place, 
  isSelected, 
  isSaved,
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  onToggleSave
}: PlaceCardProps) {
  return (
    <div 
      className={`flex flex-col gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
        isSelected ? 'bg-primary/5 border-primary shadow-md' : 'bg-card border-transparent hover:bg-muted/50'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full h-48 rounded-lg overflow-hidden flex-shrink-0 relative">
        <img 
          src={place.image_url} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleSave) onToggleSave(place.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
            isSaved 
              ? 'bg-rose-500/90 text-white hover:bg-rose-600' 
              : 'bg-black/20 text-white hover:bg-black/40 hover:text-rose-400'
          }`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{place.name}</h3>
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm font-medium">
            <span>{place.rating}</span>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Delhi
          </span>
          <span>•</span>
          <span>{place.category}</span>
          <span>•</span>
          <span className="font-medium text-foreground">{place.price_level}</span>
        </div>
      </div>
    </div>
  )
}

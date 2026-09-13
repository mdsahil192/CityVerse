from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from .. import models

router = APIRouter()

# Mock data for timeline/statistics to supplement the basic Neighborhood model
NEIGHBORHOOD_STATS = {
    "Hauz Khas": {
        "best_time": "October to March",
        "vibe": "Energetic, Artsy, Historic",
        "peak_months": ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        "timeline_data": [
            {"month": "Jan", "score": 90},
            {"month": "Feb", "score": 85},
            {"month": "Mar", "score": 75},
            {"month": "Apr", "score": 40},
            {"month": "May", "score": 20},
            {"month": "Jun", "score": 15},
            {"month": "Jul", "score": 30},
            {"month": "Aug", "score": 40},
            {"month": "Sep", "score": 60},
            {"month": "Oct", "score": 85},
            {"month": "Nov", "score": 95},
            {"month": "Dec", "score": 100},
        ],
        "image_url": "https://images.unsplash.com/photo-1555503463-fb5291a84f3e?q=80&w=800&auto=format&fit=crop"
    },
    "Connaught Place": {
        "best_time": "September to March",
        "vibe": "Commercial, Grand, Historic",
        "peak_months": ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        "timeline_data": [
            {"month": "Jan", "score": 85},
            {"month": "Feb", "score": 85},
            {"month": "Mar", "score": 80},
            {"month": "Apr", "score": 50},
            {"month": "May", "score": 25},
            {"month": "Jun", "score": 20},
            {"month": "Jul", "score": 35},
            {"month": "Aug", "score": 45},
            {"month": "Sep", "score": 70},
            {"month": "Oct", "score": 85},
            {"month": "Nov", "score": 95},
            {"month": "Dec", "score": 95},
        ],
        "image_url": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop"
    },
    # Default fallback
    "default": {
        "best_time": "September to April",
        "vibe": "Cultural, Historic, Bustling",
        "peak_months": ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
        "timeline_data": [
            {"month": "Jan", "score": 80},
            {"month": "Feb", "score": 85},
            {"month": "Mar", "score": 70},
            {"month": "Apr", "score": 50},
            {"month": "May", "score": 25},
            {"month": "Jun", "score": 20},
            {"month": "Jul", "score": 35},
            {"month": "Aug", "score": 45},
            {"month": "Sep", "score": 70},
            {"month": "Oct", "score": 85},
            {"month": "Nov", "score": 90},
            {"month": "Dec", "score": 95},
        ],
        "image_url": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop"
    }
}

@router.get("/")
def get_neighborhoods(db: Session = Depends(get_db)):
    neighborhoods = db.query(models.Neighborhood).all()
    
    result = []
    for n in neighborhoods:
        stats = NEIGHBORHOOD_STATS.get(n.name, NEIGHBORHOOD_STATS["default"])
        item = {
            "id": n.id,
            "name": n.name,
            "city_id": n.city_id,
            "latitude": n.latitude,
            "longitude": n.longitude,
            "stats": stats
        }
        result.append(item)
        
    # If DB is empty, provide some default mock data for the frontend to show
    if not result:
        result = [
            {
                "id": 1,
                "name": "Hauz Khas",
                "city_id": 1,
                "latitude": 28.5535,
                "longitude": 77.1934,
                "stats": NEIGHBORHOOD_STATS["Hauz Khas"]
            },
            {
                "id": 2,
                "name": "Connaught Place",
                "city_id": 1,
                "latitude": 28.6304,
                "longitude": 77.2177,
                "stats": NEIGHBORHOOD_STATS["Connaught Place"]
            },
            {
                "id": 3,
                "name": "Chandni Chowk",
                "city_id": 1,
                "latitude": 28.6505,
                "longitude": 77.2303,
                "stats": NEIGHBORHOOD_STATS["default"]
            }
        ]
        
    return result

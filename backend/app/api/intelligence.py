from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.intelligence_service import IntelligenceService

router = APIRouter()

@router.get("/{city_id}")
def get_city_intelligence(city_id: int, db: Session = Depends(get_db)):
    """
    Returns the complete urban intelligence dashboard data for a given city.
    This aggregates weather, air quality, traffic, crime, and general metrics.
    """
    service = IntelligenceService(db)
    
    intelligence_data = service.get_full_city_intelligence(city_id)
    if not intelligence_data:
        raise HTTPException(status_code=404, detail="City not found")
        
    return intelligence_data

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas
from ..core.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Place])
def get_places(
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    mood: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Place)
    
    if category:
        query = query.filter(models.Place.category.ilike(f"%{category}%"))
        
    places = query.offset(skip).limit(limit).all()
    
    # Manually fetch moods for simplicity in this dev phase
    result = []
    for place in places:
        # In a real app we'd join, but for demo we just fetch
        moods = db.query(models.place_moods).filter(models.place_moods.c.place_id == place.id).all()
        place_dict = place.__dict__.copy()
        place_dict['moods'] = [m.mood_id for m in moods]
        result.append(place_dict)
        
    return result

@router.get("/{place_id}", response_model=schemas.Place)
def get_place(place_id: int, db: Session = Depends(get_db)):
    place = db.query(models.Place).filter(models.Place.id == place_id).first()
    if place:
        moods = db.query(models.place_moods).filter(models.place_moods.c.place_id == place.id).all()
        place_dict = place.__dict__.copy()
        place_dict['moods'] = [m.mood_id for m in moods]
        return place_dict
    return None

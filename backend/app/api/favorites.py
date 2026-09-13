from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from ..core.database import get_db
from ..core.auth import get_current_user
from .. import models

router = APIRouter()

@router.get("/")
def get_favorites(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]
    favorites = db.query(models.Favorite).filter(models.Favorite.user_id == user_id).all()
    
    # Let's return the places directly for convenience
    return [{"favorite_id": fav.id, "place": fav.place} for fav in favorites]

@router.post("/{place_id}")
def add_favorite(place_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]
    
    # Check if place exists
    place = db.query(models.Place).filter(models.Place.id == place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
        
    # Check if already favorited
    existing = db.query(models.Favorite).filter(
        models.Favorite.user_id == user_id, 
        models.Favorite.place_id == place_id
    ).first()
    
    if existing:
        return {"message": "Already favorited", "favorite_id": existing.id}
        
    favorite = models.Favorite(user_id=user_id, place_id=place_id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    
    return {"message": "Added to favorites", "favorite_id": favorite.id}

@router.delete("/{place_id}")
def remove_favorite(place_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]
    
    favorite = db.query(models.Favorite).filter(
        models.Favorite.user_id == user_id, 
        models.Favorite.place_id == place_id
    ).first()
    
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
        
    db.delete(favorite)
    db.commit()
    
    return {"message": "Removed from favorites"}

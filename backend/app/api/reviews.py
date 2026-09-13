from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel

from ..core.database import get_db
from ..core.auth import get_current_user
from .. import models

router = APIRouter()

class ReviewCreate(BaseModel):
    rating: int
    comment: str | None = None

@router.get("/{place_id}")
def get_reviews(place_id: int, db: Session = Depends(get_db)):
    reviews = db.query(models.Review).filter(models.Review.place_id == place_id).all()
    return reviews

@router.post("/{place_id}")
def create_review(
    place_id: int, 
    review: ReviewCreate, 
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["id"]
    
    # Check if place exists
    place = db.query(models.Place).filter(models.Place.id == place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
        
    # Check if user already reviewed
    existing = db.query(models.Review).filter(
        models.Review.user_id == user_id, 
        models.Review.place_id == place_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="You have already reviewed this place")
        
    new_review = models.Review(
        user_id=user_id,
        user_name=current_user.get("email", "Anonymous").split('@')[0], # Just use email prefix for now
        place_id=place_id,
        rating=review.rating,
        comment=review.comment
    )
    
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    
    # Update average rating of the place
    all_reviews = db.query(models.Review).filter(models.Review.place_id == place_id).all()
    if all_reviews:
        new_rating = sum(r.rating for r in all_reviews) / len(all_reviews)
        place.rating = round(new_rating, 1)
        db.commit()
    
    return new_review

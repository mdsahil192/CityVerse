from pydantic import BaseModel
from typing import List, Optional

class PlaceBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    price_level: Optional[str] = None
    rating: float = 0.0
    latitude: float
    longitude: float
    image_url: Optional[str] = None

class Place(PlaceBase):
    id: int
    city_id: int
    neighborhood_id: Optional[int] = None
    moods: List[str] = []

    class Config:
        from_attributes = True

class NeighborhoodBase(BaseModel):
    name: str
    latitude: float
    longitude: float

class Neighborhood(NeighborhoodBase):
    id: int
    city_id: int

    class Config:
        from_attributes = True

class CityBase(BaseModel):
    name: str
    country: str
    latitude: float
    longitude: float

class City(CityBase):
    id: int

    class Config:
        from_attributes = True

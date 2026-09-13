from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, JSON, Table
from sqlalchemy.orm import relationship
import uuid
from .core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    username = Column(String, unique=True, index=True)
    mobile = Column(String, unique=True, index=True)
    hashed_password = Column(String)

place_moods = Table(
    'place_moods', Base.metadata,
    Column('place_id', Integer, ForeignKey('places.id'), primary_key=True),
    Column('mood_id', String, primary_key=True) # e.g. "chill", "date-night"
)

class City(Base):
    __tablename__ = "cities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    country = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    
    neighborhoods = relationship("Neighborhood", back_populates="city")
    places = relationship("Place", back_populates="city")

class Neighborhood(Base):
    __tablename__ = "neighborhoods"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"))
    latitude = Column(Float)
    longitude = Column(Float)
    
    city = relationship("City", back_populates="neighborhoods")
    places = relationship("Place", back_populates="neighborhood")

class Place(Base):
    __tablename__ = "places"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    category = Column(String, index=True) # e.g. "Cafe", "Restaurant"
    price_level = Column(String, nullable=True) # e.g. "₹₹"
    rating = Column(Float, default=0.0)
    
    latitude = Column(Float)
    longitude = Column(Float)
    
    city_id = Column(Integer, ForeignKey("cities.id"))
    neighborhood_id = Column(Integer, ForeignKey("neighborhoods.id"), nullable=True)
    
    # Store images as JSON array
    image_url = Column(String, nullable=True)
    
    city = relationship("City", back_populates="places")
    neighborhood = relationship("Neighborhood", back_populates="places")
    reviews = relationship("Review", back_populates="place")
    
    # Moods stored in association table
    # This allows filtering places by mood
    # For simplicity, we just store the string IDs of moods

class Favorite(Base):
    __tablename__ = "favorites"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True) # UUID string
    place_id = Column(Integer, ForeignKey("places.id"))
    
    place = relationship("Place")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True) # UUID string
    user_name = Column(String, nullable=True) # Storing basic user info for display
    place_id = Column(Integer, ForeignKey("places.id"))
    rating = Column(Integer)
    comment = Column(Text, nullable=True)
    
    place = relationship("Place", back_populates="reviews")

# --- URBAN INTELLIGENCE MODELS ---

class CityMetric(Base):
    __tablename__ = "city_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), unique=True)
    
    population = Column(Integer, nullable=True)
    population_density = Column(Integer, nullable=True)
    health_score = Column(Float, nullable=True)
    risk_score = Column(String, nullable=True)
    
    city = relationship("City")

class WeatherData(Base):
    __tablename__ = "weather_data"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), unique=True)
    
    temperature = Column(Float, nullable=True)
    feels_like = Column(Float, nullable=True)
    condition = Column(String, nullable=True)
    humidity = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    uv_index = Column(Float, nullable=True)
    updated_at = Column(String, nullable=True)
    data_source = Column(String, default="MockWeather API")
    status = Column(String, default="Live")

class AirQualityData(Base):
    __tablename__ = "air_quality_data"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), unique=True)
    
    aqi = Column(Integer, nullable=True)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    no2 = Column(Float, nullable=True)
    category = Column(String, nullable=True)
    updated_at = Column(String, nullable=True)
    data_source = Column(String, default="OpenAQ Fallback")
    status = Column(String, default="Live")
    
class TrafficData(Base):
    __tablename__ = "traffic_data"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), unique=True)
    
    congestion_level = Column(Integer, nullable=True) # percentage
    status_text = Column(String, nullable=True)
    updated_at = Column(String, nullable=True)
    data_source = Column(String, default="TrafficStats API")
    status = Column(String, default="Live")

class CrimeData(Base):
    __tablename__ = "crime_data"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), unique=True)
    
    safety_score = Column(Float, nullable=True)
    crime_rate = Column(String, nullable=True) # e.g. "Moderate Risk"
    updated_at = Column(String, nullable=True)
    data_source = Column(String, default="Public Safety Datasets")
    status = Column(String, default="Cached")


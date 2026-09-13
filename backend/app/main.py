from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine
from . import models
from .api import places, favorites, neighborhoods, reviews, auth, intelligence

# Create tables for dev
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CITYVERSE API",
    description="API for the CITYVERSE platform",
    version="1.0.0",
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(places.router, prefix="/api/places", tags=["places"])
app.include_router(favorites.router, prefix="/api/favorites", tags=["favorites"])
app.include_router(neighborhoods.router, prefix="/api/neighborhoods", tags=["neighborhoods"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])
app.include_router(intelligence.router, prefix="/api/intelligence", tags=["intelligence"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CITYVERSE API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

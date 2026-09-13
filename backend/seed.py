from app.core.database import SessionLocal, engine
from app import models

def seed_db():
    print("Seeding database with demo data...")
    db = SessionLocal()
    
    # Reset
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)
    
    delhi = models.City(name="Delhi", country="India", latitude=28.6139, longitude=77.2090)
    db.add(delhi)
    db.commit()
    db.refresh(delhi)
    
    cp = models.Neighborhood(name="Connaught Place", city_id=delhi.id, latitude=28.6304, longitude=77.2177)
    hk = models.Neighborhood(name="Hauz Khas", city_id=delhi.id, latitude=28.5494, longitude=77.2001)
    
    mumbai = models.City(name="Mumbai", country="India", latitude=19.0760, longitude=72.8777)
    bangalore = models.City(name="Bangalore", country="India", latitude=12.9716, longitude=77.5946)
    chennai = models.City(name="Chennai", country="India", latitude=13.0827, longitude=80.2707)
    kolkata = models.City(name="Kolkata", country="India", latitude=22.5726, longitude=88.3639)
    hyderabad = models.City(name="Hyderabad", country="India", latitude=17.3850, longitude=78.4867)
    jaipur = models.City(name="Jaipur", country="India", latitude=26.9124, longitude=75.7873)
    
    db.add_all([mumbai, bangalore, chennai, kolkata, hyderabad, jaipur])
    db.commit()
    for city in [mumbai, bangalore, chennai, kolkata, hyderabad, jaipur]:
        db.refresh(city)
    
    bandra = models.Neighborhood(name="Bandra West", city_id=mumbai.id, latitude=19.0596, longitude=72.8295)
    colaba = models.Neighborhood(name="Colaba", city_id=mumbai.id, latitude=18.9067, longitude=72.8147)
    indiranagar = models.Neighborhood(name="Indiranagar", city_id=bangalore.id, latitude=12.9784, longitude=77.6408)
    mylapore = models.Neighborhood(name="Mylapore", city_id=chennai.id, latitude=13.0368, longitude=80.2676)
    park_street = models.Neighborhood(name="Park Street", city_id=kolkata.id, latitude=22.5529, longitude=88.3526)
    banjara_hills = models.Neighborhood(name="Banjara Hills", city_id=hyderabad.id, latitude=17.4156, longitude=78.4347)
    c_scheme = models.Neighborhood(name="C Scheme", city_id=jaipur.id, latitude=26.9062, longitude=75.7951)
    
    neighborhoods = [cp, hk, bandra, colaba, indiranagar, mylapore, park_street, banjara_hills, c_scheme]
    db.add_all(neighborhoods)
    db.commit()
    for n in neighborhoods:
        db.refresh(n)
    
    places = [
        models.Place(
            name="United Coffee House",
            description="Legendary vintage cafe with beautiful interiors.",
            category="Cafe",
            price_level="₹₹₹",
            rating=4.5,
            latitude=28.6328,
            longitude=77.2197,
            city_id=delhi.id,
            neighborhood_id=cp.id,
            image_url="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Hauz Khas Social",
            description="Popular workspace and bar overlooking the lake.",
            category="Bar",
            price_level="₹₹₹",
            rating=4.4,
            latitude=28.5535,
            longitude=77.1945,
            city_id=delhi.id,
            neighborhood_id=hk.id,
            image_url="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Lodhi Gardens",
            description="Historical park with beautiful tombs and nature.",
            category="Park",
            price_level="Free",
            rating=4.8,
            latitude=28.5933,
            longitude=77.2197,
            city_id=delhi.id,
            image_url="https://images.unsplash.com/photo-1596423735880-5f2a689b903e?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Big Chill Cafe",
            description="Iconic cafe famous for Italian food and desserts.",
            category="Cafe",
            price_level="₹₹₹",
            rating=4.6,
            latitude=28.6015,
            longitude=77.2272,
            city_id=delhi.id,
            image_url="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Leopold Cafe",
            description="Historic restaurant and bar in Colaba.",
            category="Restaurant",
            price_level="₹₹₹",
            rating=4.3,
            latitude=18.9229,
            longitude=72.8318,
            city_id=mumbai.id,
            neighborhood_id=colaba.id,
            image_url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Bandstand Promenade",
            description="Famous walkway along the sea.",
            category="Park",
            price_level="Free",
            rating=4.7,
            latitude=19.0494,
            longitude=72.8197,
            city_id=mumbai.id,
            neighborhood_id=bandra.id,
            image_url="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Toit Brewpub",
            description="Legendary microbrewery.",
            category="Bar",
            price_level="₹₹₹",
            rating=4.8,
            latitude=12.9791,
            longitude=77.6405,
            city_id=bangalore.id,
            neighborhood_id=indiranagar.id,
            image_url="https://images.unsplash.com/photo-1575037614876-c38556f65d28?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Marina Beach",
            description="Longest natural urban beach in India.",
            category="Park",
            price_level="Free",
            rating=4.5,
            latitude=13.0500,
            longitude=80.2824,
            city_id=chennai.id,
            neighborhood_id=mylapore.id,
            image_url="https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Victoria Memorial",
            description="Large marble building and museum.",
            category="Museum",
            price_level="₹",
            rating=4.8,
            latitude=22.5448,
            longitude=88.3426,
            city_id=kolkata.id,
            neighborhood_id=park_street.id,
            image_url="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Charminar",
            description="Iconic mosque and monument.",
            category="Museum",
            price_level="₹",
            rating=4.6,
            latitude=17.3616,
            longitude=78.4747,
            city_id=hyderabad.id,
            image_url="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600"
        ),
        models.Place(
            name="Hawa Mahal",
            description="Palace of winds.",
            category="Museum",
            price_level="₹",
            rating=4.7,
            latitude=26.9239,
            longitude=75.8267,
            city_id=jaipur.id,
            image_url="https://images.unsplash.com/photo-1599661559875-e11bf37eb786?auto=format&fit=crop&q=80&w=600"
        )
    ]
    
    db.add_all(places)
    db.commit()
    
    # Add Moods
    db.execute(models.place_moods.insert().values([
        {"place_id": 1, "mood_id": "chill"},
        {"place_id": 1, "mood_id": "date-night"},
        {"place_id": 2, "mood_id": "party"},
        {"place_id": 2, "mood_id": "chill"},
        {"place_id": 3, "mood_id": "peaceful"},
        {"place_id": 3, "mood_id": "photography"},
        {"place_id": 4, "mood_id": "hungry"},
        {"place_id": 4, "mood_id": "date-night"},
        {"place_id": 5, "mood_id": "hungry"},
        {"place_id": 5, "mood_id": "chill"},
        {"place_id": 6, "mood_id": "peaceful"},
        {"place_id": 6, "mood_id": "date-night"},
        {"place_id": 7, "mood_id": "party"},
        {"place_id": 7, "mood_id": "chill"},
        {"place_id": 8, "mood_id": "peaceful"},
        {"place_id": 8, "mood_id": "photography"},
        {"place_id": 9, "mood_id": "peaceful"},
        {"place_id": 9, "mood_id": "photography"},
        {"place_id": 10, "mood_id": "photography"},
        {"place_id": 11, "mood_id": "photography"},
    ]))
    db.commit()
    
    print("Database seeded!")
    db.close()

if __name__ == "__main__":
    seed_db()

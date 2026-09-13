from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..core.database import get_db
from .. import models
from ..core.auth import get_password_hash, verify_password, create_access_token

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    mobile: str
    password: str

class UserLogin(BaseModel):
    mobile: str
    password: str

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username or mobile already exists
    db_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.mobile == user.mobile)
    ).first()
    
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Username or mobile number already registered"
        )
        
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        mobile=user.mobile,
        hashed_password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Automatically log them in by returning a token, or just return success.
    # We will return the token immediately to fulfill "login without email verification"
    access_token = create_access_token(
        data={"sub": str(new_user.id), "username": new_user.username, "mobile": new_user.mobile}
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": str(new_user.id),
            "username": new_user.username,
            "mobile": new_user.mobile
        }
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.mobile == user.mobile).first()
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect mobile number or password",
        )
        
    access_token = create_access_token(
        data={"sub": str(db_user.id), "username": db_user.username, "mobile": db_user.mobile}
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": str(db_user.id),
            "username": db_user.username,
            "mobile": db_user.mobile
        }
    }

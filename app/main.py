from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import Base, engine, User, get_db
from app.routes import router


# --------------------------------------------------
# Database Initialization
# --------------------------------------------------

Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="FitBuddy - AI Fitness Plan Generator",
    description="AI-powered fitness planning application using Gemini",
    version="1.0.0"
)


# --------------------------------------------------
# Templates
# --------------------------------------------------

templates = Jinja2Templates(
    directory="templates"
)


# --------------------------------------------------
# API Router
# --------------------------------------------------

app.include_router(router)


# --------------------------------------------------
# Home Page
# --------------------------------------------------

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }


# --------------------------------------------------
# Admin Dashboard
# --------------------------------------------------

@app.get("/view-all-users")
def view_all_users(
    request: Request,
    db: Session = Depends(get_db)
):
    users = db.query(User).all()

    return templates.TemplateResponse(
        request=request,
        name="all_users.html",
        context={
            "users": users
        }
    )


# --------------------------------------------------
# Result Page
# --------------------------------------------------

@app.get("/result.html")
def result_page(
    request: Request,
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return templates.TemplateResponse(
        request=request,
        name="result.html",
        context={
            "user": user
        }
    )
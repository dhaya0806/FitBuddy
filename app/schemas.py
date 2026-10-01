from pydantic import BaseModel, Field
from typing import Optional


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=13, le=100)
    gender: str
    fitness_goal: str
    fitness_level: str
    workout_days: int = Field(..., ge=1, le=7)
    diet_preference: Optional[str] = None


class WorkoutPlanResponse(BaseModel):
    user_id: int
    plan: str
    nutrition_tip: Optional[str] = None


class FeedbackCreate(BaseModel):
    user_id: int
    feedback: str = Field(..., min_length=1, max_length=1000)
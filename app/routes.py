from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import User, get_db
from app.schemas import UserCreate
from app.gemini_generator import generate_workout_gemini
from app.gemini_flash_generator import generate_nutrition_tip_with_flash
from app.updated_plan import update_workout_plan


# ==================================================
# API ROUTER
# ==================================================

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


# ==================================================
# CREATE USER
# ==================================================

@router.post("/")
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        name=user_data.name,
        age=user_data.age,
        gender=user_data.gender,
        fitness_goal=user_data.fitness_goal,
        fitness_level=user_data.fitness_level,
        workout_days=user_data.workout_days,
        diet_preference=user_data.diet_preference
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }


# ==================================================
# GET ALL USERS
# ==================================================

@router.get("/")
def get_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()


# ==================================================
# GENERATE WORKOUT PLAN
# ==================================================

@router.post("/{user_id}/generate-workout")
def generate_workout(
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

    workout_plan = generate_workout_gemini(
        goal=user.fitness_goal,
        fitness_level=user.fitness_level,
        workout_days=user.workout_days,
        age=user.age,
        gender=user.gender
    )

    user.workout_plan = workout_plan

    db.commit()
    db.refresh(user)

    return {
        "message": "Workout plan generated and saved successfully",
        "user_id": user.id,
        "workout_plan": user.workout_plan
    }


# ==================================================
# GENERATE NUTRITION TIP
# ==================================================

@router.post("/{user_id}/generate-nutrition")
def generate_nutrition(
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

    nutrition_tip = generate_nutrition_tip_with_flash(
        goal=user.fitness_goal,
        fitness_level=user.fitness_level,
        diet_preference=user.diet_preference or "No preference",
        age=user.age,
        gender=user.gender
    )

    user.nutrition_tip = nutrition_tip

    db.commit()
    db.refresh(user)

    return {
        "message": "Nutrition tip generated and saved successfully",
        "user_id": user.id,
        "nutrition_tip": user.nutrition_tip
    }


# ==================================================
# UPDATE WORKOUT USING USER FEEDBACK
# ==================================================

@router.post("/{user_id}/update-workout")
def update_workout(
    user_id: int,
    feedback: str,
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

    if not user.workout_plan:
        raise HTTPException(
            status_code=400,
            detail="Original workout plan not found. Generate a workout plan first."
        )

    if not feedback.strip():
        raise HTTPException(
            status_code=400,
            detail="Feedback cannot be empty."
        )

    # Save feedback
    user.feedback = feedback

    # Generate updated workout plan
    updated_plan = update_workout_plan(
        original_plan=user.workout_plan,
        user_feedback=feedback
    )

    # Save updated workout plan
    user.updated_workout_plan = updated_plan

    db.commit()
    db.refresh(user)

    return {
        "message": "Workout plan updated and saved successfully",
        "user_id": user.id,
        "feedback": user.feedback,
        "original_workout_plan": user.workout_plan,
        "updated_workout_plan": user.updated_workout_plan
    }
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker


# --------------------------------------------------
# Database Configuration
# --------------------------------------------------

DATABASE_URL = "sqlite:///./fitbuddy.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# --------------------------------------------------
# Database Session
# --------------------------------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# --------------------------------------------------
# User Model
# --------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    age = Column(
        Integer,
        nullable=False
    )

    gender = Column(
        String(50),
        nullable=False
    )

    fitness_goal = Column(
        String(100),
        nullable=False
    )

    fitness_level = Column(
        String(50),
        nullable=False
    )

    workout_days = Column(
        Integer,
        nullable=False
    )

    diet_preference = Column(
        String(100),
        nullable=True
    )

    # Original AI-generated workout plan
    workout_plan = Column(
        Text,
        nullable=True
    )

    # Updated workout plan after feedback
    updated_workout_plan = Column(
        Text,
        nullable=True
    )

    # AI-generated nutrition advice
    nutrition_tip = Column(
        Text,
        nullable=True
    )

    # User feedback
    feedback = Column(
        Text,
        nullable=True
    )
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing from .env")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_workout_gemini(
    goal: str,
    fitness_level: str,
    workout_days: int,
    age: int,
    gender: str
) -> str:

    prompt = f"""
You are an AI fitness trainer for an application called FitBuddy.

Create a personalized {workout_days}-day workout plan for the user.

User Information:
- Age: {age}
- Gender: {gender}
- Fitness Goal: {goal}
- Fitness Level: {fitness_level}
- Workout Days: {workout_days}

For each workout day include:

1. Warm-up
2. Main workout
3. Exercise names
4. Sets and repetitions
5. Rest time
6. Cool-down
7. Recovery advice

Requirements:
- Make the plan practical and structured.
- Consider the user's fitness level.
- Avoid unnecessary medical claims.
- Clearly separate each day.
- Keep the response easy to read.
"""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        if not response or not response.text:
            return "No workout plan was generated."

        return response.text.strip()

    except Exception as error:
        return f"Gemini workout generation failed: {error}"
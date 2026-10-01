import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing from .env")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.5-flash-lite"


def update_workout_plan(
    original_plan: str,
    user_feedback: str
) -> str:

    prompt = f"""
You are an AI fitness trainer for an application called FitBuddy.

The user already has an existing workout plan.

Original Workout Plan:
{original_plan}

User Feedback:
{user_feedback}

Create an updated workout plan based on the user's feedback.

Requirements:

1. Keep useful parts of the original plan.
2. Apply the user's feedback wherever appropriate.
3. Maintain a clear day-by-day structure.
4. Include warm-up.
5. Include main workout.
6. Include exercises with sets and repetitions.
7. Include rest time.
8. Include cool-down.
9. Include recovery advice.
10. Keep the plan practical and appropriate for the user's stated fitness level.
11. Do not provide medical diagnosis or treatment.

Return only the updated workout plan.
"""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        if not response or not response.text:
            return "No updated workout plan was generated."

        return response.text.strip()

    except Exception as error:
        return f"Workout plan update failed: {error}"
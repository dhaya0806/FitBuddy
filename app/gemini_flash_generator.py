import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing from .env")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_nutrition_tip_with_flash(
    goal: str,
    fitness_level: str,
    diet_preference: str,
    age: int,
    gender: str
) -> str:

    prompt = f"""
You are an AI nutrition assistant for an application called FitBuddy.

Generate a personalized daily nutrition and recovery tip.

User Information:
- Age: {age}
- Gender: {gender}
- Fitness Goal: {goal}
- Fitness Level: {fitness_level}
- Diet Preference: {diet_preference}

Provide:

1. Daily nutrition advice
2. Suitable food suggestions
3. Protein guidance
4. Hydration advice
5. Pre-workout nutrition
6. Post-workout nutrition
7. Recovery advice

Requirements:
- Keep the advice practical and easy to understand.
- Consider the user's fitness goal and diet preference.
- Do not provide medical diagnosis or treatment.
- Clearly organize the response.
"""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        if not response or not response.text:
            return "No nutrition tip was generated."

        return response.text.strip()

    except Exception as error:
        return f"Gemini nutrition generation failed: {error}"
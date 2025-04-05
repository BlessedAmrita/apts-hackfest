import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
from config.keywords import ISSUE_KEYWORDS, POSITIVE_EMOTION_KEYWORDS, NEGATIVE_EMOTION_KEYWORDS

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

# Utility to handle both string and list types
def safe_keyword_list(value):
    if isinstance(value, list):
        return [v.strip() for v in value if v.strip()]
    elif isinstance(value, str):
        return [v.strip() for v in value.split(",") if v.strip()]
    else:
        return []

def analyze_feedback(text):
    prompt = f"""
Analyze the following event feedback and classify it using the predefined keyword lists.

Feedback: "{text}"

Return a JSON with:
- sentiment: overall impression ("positive", "neutral", or "negative")
- issue_keyword: one or more issues from this list: {ISSUE_KEYWORDS}. If the issue is not an exact match, map it to the closest relevant keyword.
- positive_emotion_keyword: one or more emotions from this list: {POSITIVE_EMOTION_KEYWORDS}. If the feedback expresses a positive emotion not in the list, choose the closest keyword.
- negative_emotion_keyword: one or more emotions from this list: {NEGATIVE_EMOTION_KEYWORDS}. Same rule applies — infer the closest match.
- severity: a number from 1 to 10. Assign severity on a scale where:
  - 8-10: Critical emergencies or safety threats
  - 5-7: Large-scale disruptions or major issues
  - 1-4: Comfort or quality-of-life annoyances


Rules:
- Use only the keywords provided.
- If multiple keywords are applicable, separate them with commas.
- Infer implicit or indirect signals (e.g., “The volunteers were hard to find” → "volunteer_unavailable").

Respond ONLY with valid JSON.
"""

    try:
        response = model.generate_content(prompt)
        content = response.text.strip()

        # Extract only the JSON part
        json_start = content.find("{")
        json_end = content.rfind("}") + 1
        raw_json = content[json_start:json_end]

        result = json.loads(raw_json)

        # Normalize fields to lists
        result["issue_keyword"] = safe_keyword_list(result.get("issue_keyword", ""))
        result["positive_emotion_keyword"] = safe_keyword_list(result.get("positive_emotion_keyword", ""))
        result["negative_emotion_keyword"] = safe_keyword_list(result.get("negative_emotion_keyword", ""))

        return result

    except Exception as e:
        print(f"Gemini error: {e}")
        return None

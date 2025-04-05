# severity_classifier.py

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI()

# STEP A: Define Pydantic models that mirror your Gemini output structure.

class IssueData(BaseModel):
    count: int
    severity: int
    impact_score: int

class EmotionSummary(BaseModel):
    positive_total: int
    negative_total: int
    overall_mood: str

class InputPayload(BaseModel):
    issues: Dict[str, IssueData]
    positive_emotions: Dict[str, int]
    negative_emotions: Dict[str, int]
    emotion_summary: EmotionSummary

# STEP B: Helper function to compute combined_score and classify severity

def compute_combined_score(issue: IssueData, alpha: float = 1.0, beta: float = 4.0) -> float:
    """
    For each issue:
      - impact_score is the sum of severity across all complaints
      - severity is the 'max_single_severity' seen for that issue
    combined_score = alpha * impact_score + beta * severity
    """
    return alpha * issue.impact_score + beta * issue.severity

def classify_severity(combined_score: float) -> str:
    """
    Example thresholds:
      < 20 => low
      20–39 => medium
      >= 40 => high
    """
    if combined_score < 20:
        return "low"
    elif combined_score < 40:
        return "medium"
    else:
        return "high"

# STEP C: Create the endpoint that receives the Gemini-like JSON and returns final severities.

@app.post("/classify-severity")
def classify_issues(payload: InputPayload):
    """
    This endpoint takes the Gemini-style payload,
    calculates combined_score for each issue,
    determines final severity,
    and returns a summary.
    """
    results = {}
    alpha = 1.0
    beta = 4.0

    for issue_name, issue_data in payload.issues.items():
        combined_score = compute_combined_score(issue_data, alpha, beta)
        final_sev = classify_severity(combined_score)
        results[issue_name] = {
            "combined_score": combined_score,
            "final_severity": final_sev,
            "original_count": issue_data.count,
            "original_impact_score": issue_data.impact_score,
            "original_severity": issue_data.severity
        }

    # You can also use payload.positive_emotions / payload.negative_emotions as needed
    # Or perform additional logic on the emotion_summary

    return {
        "classified_issues": results,
        "overall_mood": payload.emotion_summary.overall_mood
    }

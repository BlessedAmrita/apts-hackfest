from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from core.preprocess import preprocess_text_list
from core.analyzer import analyze_feedback
from utils.counter import aggregate_results
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI(title="Batch Sentiment Analyzer")

class FeedbackBatch(BaseModel):
    texts: List[str]

@app.post("/analyze-batch")
def analyze_batch_endpoint(batch: FeedbackBatch):
    cleaned_texts = preprocess_text_list(batch.texts)
    results = []

    for text in cleaned_texts:
        result = analyze_feedback(text)
        if result:
            results.append(result)

    summary = aggregate_results(results)

    # ✅ Write to file
    with open("summary_output.json", "w") as f:
        json.dump(summary, f, indent=2)

    return summary



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run_batch_analysis:app", host="0.0.0.0", port=8000, reload=True)

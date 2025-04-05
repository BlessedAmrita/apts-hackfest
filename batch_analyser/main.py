import sys
import os
import json
from core.analyzer import analyze_feedback
from core.fetch_data import fetch_feedback_texts
from core.preprocess import preprocess_text_list
from utils.counter import aggregate_results
from utils.keyword_counter import count_keywords  # ✅ New import

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"  # Suppress TF warnings

def main():
    raw_texts = fetch_feedback_texts()
    cleaned_texts = preprocess_text_list(raw_texts)

    results = []
    for text in cleaned_texts:
        result = analyze_feedback(text)
        if result:
            result["keyword_counts"] = count_keywords(text)  # ✅ Add frequency tracking
            results.append(result)

    summary = aggregate_results(results)

    # Output JSON format
    print("📊 Final Aggregated Summary (JSON):")
    print(json.dumps(summary, indent=2))

    # Save output
    with open("summary_output.json", "w") as f:
        json.dump(summary, f, indent=2)

    # Optional: log raw feedback+analysis
    with open("raw_feedback_analysis.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    main()

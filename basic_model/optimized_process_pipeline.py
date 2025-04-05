from transformers import pipeline
from input_pipeline import preprocess_feedback
import json
from flashtext import KeywordProcessor

# Load keywords from external JSON files
def load_keywords_from_json(path):
    with open(path, "r") as f:
        return json.load(f)

# Load both keyword sets
emotion_dict = load_keywords_from_json("data/emotion_keywords.json")
issue_dict = load_keywords_from_json("data/emotion_keywords.json")

# Set up FlashText
emotion_processor = KeywordProcessor()
issue_processor = KeywordProcessor()

for word, label in emotion_dict.items():
    emotion_processor.add_keyword(word, label)

for word, label in issue_dict.items():
    issue_processor.add_keyword(word, label)

# Load a lightweight BERT model fine-tuned for sentiment
sentiment_model = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

# Analyze feedback using DistilBERT and keyword extractors
def analyze_feedback_fast(raw_text):
    processed = preprocess_feedback(raw_text)
    results = []

    for entry in processed:
        sentence = entry["sentence"]

        # Sentiment classification
        sent_result = sentiment_model(sentence)[0]
        sentiment = sent_result["label"].lower()
        confidence = round(sent_result["score"], 3)

        # Keyword-based issue/emotion tagging
        emotion_tags = list(set(emotion_processor.extract_keywords(sentence)))
        issue_tags = list(set(issue_processor.extract_keywords(sentence)))

        results.append({
            "sentence": sentence,
            "sentiment": sentiment,
            "confidence": confidence,
            "emotion_tags": emotion_tags,
            "issue_tags": issue_tags
        })

    return results

# Example usage
if __name__ == "__main__":
    text = "The speaker is so loud."
    output = analyze_feedback_fast(text)
    for entry in output:
        print(entry)
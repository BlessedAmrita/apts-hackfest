import re
import spacy
from flashtext import KeywordProcessor

# Load spaCy
nlp = spacy.load("en_core_web_sm", disable=["tagger", "ner", "lemmatizer"])

# Precompiled regex
url_re = re.compile(r"http\\S+|www\\S+")
symbol_re = re.compile(r"[^a-zA-Z0-9 .,!?\']+")
space_re = re.compile(r"\\s+")

def clean_text(text):
    text = text.lower()
    text = url_re.sub('', text)
    text = symbol_re.sub(' ', text)
    text = space_re.sub(' ', text).strip()
    return text

def split_sentences(text):
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]

    # If only 1 sentence and it has potential split points, split manually
    if len(sentences) <= 1:
        # Split on conjunctions like "but", "and", "so" (not inside quotes)
        split_sentences = re.split(r'\b(?:but|and|so|because)\b', text, flags=re.IGNORECASE)
        sentences = [s.strip() for s in split_sentences if s.strip()]

    return sentences


# Keyword fallback using FlashText
keyword_map = {
    "queue": "registration queue",
    "audio": "audio issue",
    "sound": "audio issue",
    "crowd": "overcrowding",
    "overcrowded": "overcrowding",
    "food": "bad food",
    "directions": "bad directions",
    "boring": "boring session",
    "app": "app crash",
    "crash": "app crash",
    "hot": "temperature issue",
    "cold": "temperature issue",
    "speaker": "great speaker",
    "awesome": "great speaker",
    "helpful": "helpful staff",
    "clean": "clean venue",
    "networking": "good networking"
}

keyword_processor = KeywordProcessor()
for k, v in keyword_map.items():
    keyword_processor.add_keyword(k, v)

def fallback_keyword_match(sentence):
    matches = keyword_processor.extract_keywords(sentence)
    return matches[0] if matches else "unknown_issue"

def preprocess_feedback(text):
    clean = clean_text(text)
    sentences = split_sentences(clean)

    processed = []
    for sentence in sentences:
        sentence = sentence.strip("., ")  # move inside the loop
        issue = fallback_keyword_match(sentence)
        processed.append({
            "sentence": sentence,
            "fallback_issue": issue
        })

    return processed


# ---- Test ----
if __name__ == "__main__":
    feedback = "The app crashed and the queue was too long, but the speaker was inspiring."
    result = preprocess_feedback(feedback)

    for item in result:
        print(item)

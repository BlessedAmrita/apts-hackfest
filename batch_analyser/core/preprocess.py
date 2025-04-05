import re

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-zA-Z0-9 .,!?\']+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def preprocess_text_list(text_list):
    return [clean_text(text) for text in text_list if text.strip()]

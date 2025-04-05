from flashtext import KeywordProcessor
from config.keywords import ISSUE_KEYWORDS, POSITIVE_EMOTION_KEYWORDS, NEGATIVE_EMOTION_KEYWORDS

def count_keywords(text: str) -> dict:
    keyword_processor = KeywordProcessor()
    
    # Add direct keywords
    keyword_processor.add_keywords_from_list(
        ISSUE_KEYWORDS + POSITIVE_EMOTION_KEYWORDS + NEGATIVE_EMOTION_KEYWORDS
    )

    # Add alias mappings
    KEYWORD_ALIASES = {
        "queue": "registration_queue",
        "line": "registration_queue",
        "waited forever": "long_wait_time",
        "no shade": "no_water",
        "glitched": "app_crash",
        "crashed": "app_crash",
        "lost": "navigation_problem",
        "no volunteers": "volunteer_unavailable",
    }
    for alias, mapped in KEYWORD_ALIASES.items():
        keyword_processor.add_keyword(alias, mapped)

    matches = keyword_processor.extract_keywords(text)
    freq = {}
    for keyword in matches:
        freq[keyword] = freq.get(keyword, 0) + 1

    return freq

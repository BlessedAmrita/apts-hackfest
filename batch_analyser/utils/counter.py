from collections import Counter, defaultdict
from utils.severity_map import SEVERITY_MAP

def scale_severity(avg_sev):
    return min(10, max(1, int(round(avg_sev))))

def aggregate_results(results):
    issue_counter = Counter()
    pos_emotion_counter = Counter()
    neg_emotion_counter = Counter()
    issue_severity = defaultdict(list)

    for r in results:
        if not r:
            continue

        # ✅ Use keyword_counts instead of just presence
        keyword_freq = r.get("keyword_counts", {})

        for issue in r.get("issue_keyword", []):
            count = keyword_freq.get(issue, 1)
            issue_counter[issue] += count
            issue_severity[issue].extend([r.get("severity", 5)] * count)

        for emotion in r.get("positive_emotion_keyword", []):
            count = keyword_freq.get(emotion, 1)
            pos_emotion_counter[emotion] += count

        for emotion in r.get("negative_emotion_keyword", []):
            count = keyword_freq.get(emotion, 1)
            neg_emotion_counter[emotion] += count

    issue_data = {}
    for issue, count in issue_counter.items():
        severities = issue_severity.get(issue, [5])
        avg_sev = sum(severities) / len(severities)

        # Prefer mapped severity if available
        final_sev = SEVERITY_MAP.get(issue, avg_sev)
        scaled_sev = scale_severity(final_sev)
        issue_data[issue] = {
            "count": count,
            "severity": scaled_sev,
            "impact_score": count * scaled_sev
        }

    positive_total = sum(pos_emotion_counter.values())
    negative_total = sum(neg_emotion_counter.values())

    if positive_total > negative_total:
        mood = "positive"
    elif negative_total > positive_total:
        mood = "negative"
    else:
        mood = "neutral"


    return {
    "issues": issue_data,
    "positive_emotions": dict(pos_emotion_counter),
    "negative_emotions": dict(neg_emotion_counter),
    "emotion_summary": {
        "positive_total": positive_total,
        "negative_total": negative_total,
        "overall_mood": mood
    }
}


import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import { db } from "@/firebase/firebase";

/**
 * Full pipeline:
 * - Fetch posts
 * - Analyze sentiment
 * - Classify severity
 */
export async function classifyEventSeverity(eventId) {
  try {
    // 1. Fetch all posts from Firestore
    const postsRef = collection(db, `events/${eventId}/posts`);
    const snapshot = await getDocs(postsRef);

    const texts = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.text) texts.push(data.text);
    });

    if (texts.length === 0) {
      console.warn("No texts found for analysis.");
      return null;
    }

    // 2. Call Sentiment Analysis API
    const analysisResponse = await axios.post(
      "https://pjxcharya-batch-analyse.hf.space/analyze-batch",
      { texts }
    );

    const analysisData = analysisResponse.data;
    console.log("✅ Sentiment Analysis Result:", analysisData);

    // 3. Send to Severity Classifier API
    const severityResponse = await axios.post(
      "https://pjxcharya-severity-classifier.hf.space/classify-severity",
      {
        eventId, // Optional but useful for traceability
        issues: analysisData.issues,
        positiveEmotions: analysisData.positive_emotions,
        negativeEmotions: analysisData.negative_emotions,
        emotionSummary: analysisData.emotion_summary,
      }
    );

    console.log("🔥 Final Severity Classification:", severityResponse.data);
    return severityResponse.data;
  } catch (error) {
    console.error("❌ Error during severity classification:", error);
    return null;
  }
}

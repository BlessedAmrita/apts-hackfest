import { getFirestore, collection, getDocs } from "firebase/firestore";
import axios from "axios";

const db = getFirestore();

export async function analyzeEventFeedback(eventId) {
  try {
    // 1. Fetch posts from Firestore
    const postsRef = collection(db, `events/${eventId}/posts`);
    const snapshot = await getDocs(postsRef);

    // 2. Extract `text` fields
    const texts = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.text) {
        texts.push(data.text);
      }
    });

    // 3. Send to FastAPI batch analyzer
    const response = await axios.post("http://127.0.0.1:8000/analyze-batch", {
      texts,
    });
    console.log("Texts sent to API:", texts);
    // 4. Log the result
    console.log("Sentiment Analysis Summary:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    return null;
  }
}

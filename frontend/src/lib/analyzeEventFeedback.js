import { getFirestore, collection, getDocs, collectionGroup } from "firebase/firestore";
import axios from "axios";

import { db } from "@/firebase/firebase";


const countEvents = async () => {
  try {
    const snapshot = await getDocs(collectionGroup(db, "metadata"));
    
    // only count docs that have `info` inside
    const count = snapshot.docs.filter(doc => doc.id === "info").length;

    console.log("Total events:", count);
    return count;
  } catch (error) {
    console.error("Error counting events:", error);
    return 0;
  }
};


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
    const response = await axios.post("https://pjxcharya-batch-analyse.hf.space/analyze-batch", {
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

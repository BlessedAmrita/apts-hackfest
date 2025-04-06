import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import EventStatCards from "./EventStatCards";
import SentimentChart from "./SentimentChart";
import AlertsList from "./AlertsList";
import EventsList from "./EventsList";
import CreateEventButton from "./CreateEventButton";
import {
  getFirestore,
  collection,
  getDocs,
  collectionGroup
} from "firebase/firestore";
import { analyzeEventFeedback } from "@/lib/analyzeEventFeedback";

const Dashboard = () => {
  const [eventIds, setEventIds] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    // const fetchEventIds = async () => {
    //   const db = getFirestore();
    //   try {
    //     // const snapshot = await getDocs(collection(db, "events"));
    //     // const ids = snapshot.docs.map((doc) => doc.id);
    //     const snapshot = await getDocs(collectionGroup(db, "metadata"));
    //     const ids = snapshot.docs
    //       .filter(doc => doc.id === "info")
    //       .map(doc => {
    //         const pathSegments = doc.ref.path.split("/"); // events/{eventId}/metadata/info
    //         return pathSegments[1];
    //       });

    //     console.log("[fetchEventIds] Extracted event IDs from metadata/info:", ids);

    //     console.log("[fetchEventIds] Retrieved event IDs:", ids);

    //     setEventIds(ids);
    //     if (ids.length > 0) {
    //       setSelectedEventId(ids[0]);
    //       console.log("[fetchEventIds] Auto-selected first event:", ids[0]);
    //     }
    //   } catch (err) {
    //     console.error("[fetchEventIds] Error fetching events:", err);
    //   }
    // };
    const fetchEventIds = async () => {
      const db = getFirestore();
      try {
        const snapshot = await getDocs(collectionGroup(db, "metadata"));
        const infoDocs = snapshot.docs.filter((doc) => doc.id === "info");
    
        const idsWithNames = infoDocs.map((doc) => {
          const pathSegments = doc.ref.path.split("/"); // events/{eventId}/metadata/info
          const eventId = pathSegments[1];
          const data = doc.data();
          return {
            id: eventId,
            name: data.name || eventId, // fallback to eventId if name is missing
          };
        });
    
        console.log("[fetchEventIds] Event list:", idsWithNames);
    
        setEventIds(idsWithNames);
        if (idsWithNames.length > 0) {
          setSelectedEventId(idsWithNames[0].id);
          console.log("[fetchEventIds] Auto-selected first event:", idsWithNames[0].id);
        }
      } catch (err) {
        console.error("[fetchEventIds] Error fetching events:", err);
      }
    };
    
    const countValidEvents = async () => {
      const db = getFirestore();
      try {
        const snapshot = await getDocs(collectionGroup(db, "metadata"));
        console.log("[countValidEvents] All metadata docs:", snapshot.docs.map(doc => doc.id));

        const count = snapshot.docs.filter((doc) => doc.id === "info").length;
        console.log("[countValidEvents] Total events with metadata/info:", count);

        setEventCount(count);
      } catch (err) {
        console.error("[countValidEvents] Error counting events:", err);
      }
    };

    fetchEventIds();
    countValidEvents();
  }, []);

  useEffect(() => {
    const fetchSentiment = async () => {
      if (!selectedEventId) {
        console.log("[fetchSentiment] No event selected yet");
        return;
      }

      console.log("[fetchSentiment] Analyzing sentiment for:", selectedEventId);
      const result = await analyzeEventFeedback(selectedEventId);

      if (result && result.emotion_summary) {
        console.log("[fetchSentiment] Sentiment summary:", result.emotion_summary);
        setSummary(result.emotion_summary);
      } else {
        console.log("[fetchSentiment] No summary returned.");
      }
    };

    fetchSentiment();
  }, [selectedEventId]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="p-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your events.
                </p>
              </div>
              <CreateEventButton />
            </div>

            {/* Stats Overview with event count */}
            <EventStatCards eventCount={eventCount} />


            {/* Dropdown to select Event ID */}
            <div className="w-full max-w-sm">
              <label htmlFor="event-select" className="block mb-1 font-medium">
                Select Event
              </label>
              {/* <select
                id="event-select"
                className="w-full p-2 border rounded-md"
                value={selectedEventId || ""}
                onChange={(e) => {
                  console.log("[Dropdown] Event selected:", e.target.value);
                  setSelectedEventId(e.target.value);
                }}
              >
                {eventIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select> */}
              <select
  id="event-select"
  className="w-full p-2 border rounded-md"
  value={selectedEventId || ""}
  onChange={(e) => {
    console.log("[Dropdown] Event selected:", e.target.value);
    setSelectedEventId(e.target.value);
  }}
>
  {eventIds.map((event) => (
    <option key={event.id} value={event.id}>
      {event.name}
    </option>
  ))}
</select>

            </div>

            {/* Middle Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <SentimentChart summary={summary} />

              <AlertsList />
            </div>

            {/* Events List */}
            <EventsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

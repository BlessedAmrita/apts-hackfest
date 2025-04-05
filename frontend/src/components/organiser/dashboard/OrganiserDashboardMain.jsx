import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import EventStatCards from "./EventStatCards";
import SentimentChart from "./SentimentChart";
import AlertsList from "./AlertsList";
import EventsList from "./EventsList";
import CreateEventButton from "./CreateEventButton";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { analyzeEventFeedback } from "@/lib/analyzeEventFeedback";

const Dashboard = () => {
  const [eventIds, setEventIds] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchEventIds = async () => {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, "events"));
      const ids = snapshot.docs.map((doc) => doc.id);
      setEventIds(ids);
      if (ids.length > 0) setSelectedEventId(ids[0]); // Auto-select first
    };

    fetchEventIds();
  }, []);
  console.log("Event IDs:", eventIds);
  useEffect(() => {
    const fetchSentiment = async () => {
      if (!selectedEventId) return;
      const result = await analyzeEventFeedback(selectedEventId);
      if (result && result.emotion_summary) {
        setSummary(result.emotion_summary);
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

            {/* Stats Overview */}
            <EventStatCards />

            {/* Dropdown to select Event ID */}
            <div className="w-full max-w-sm">
              <label htmlFor="event-select" className="block mb-1 font-medium">
                Select Event
              </label>
              <select
                id="event-select"
                className="w-full p-2 border rounded-md"
                value={selectedEventId || ""}
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                {eventIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
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

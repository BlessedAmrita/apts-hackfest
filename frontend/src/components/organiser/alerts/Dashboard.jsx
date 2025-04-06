"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getFirestore, collection, collectionGroup, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import axios from "axios";

const OrganizerDashboard = () => {
  const [eventList, setEventList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [severityData, setSeverityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overallMood, setOverallMood] = useState("");

  const user = useSelector((state) => state.user);
  const db = getFirestore();

  // Fetch Event List on Mount
  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      try {
        const snapshot = await getDocs(collectionGroup(db, "metadata"));
        const infoDocs = snapshot.docs.filter((doc) => doc.id === "info");

        const events = infoDocs.map((doc) => {
          const pathSegments = doc.ref.path.split("/");
          const eventId = pathSegments[1];
          const data = doc.data();
          return {
            id: eventId,
            name: data.name || eventId,
          };
        });

        setEventList(events);
      } catch (err) {
        console.error("[fetchEvents] Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Fetch and Chain Analyze → Classify APIs
  useEffect(() => {
    const fetchSeverityData = async () => {
      if (!selectedEventId) {
        console.log("No event selected. Skipping severity fetch.");
        return;
      }

      setLoading(true);
      console.log("Event selected:", selectedEventId);
      console.log("Step 1: Calling batch-analyze API for event:", selectedEventId);

      try {
        // Step 1: Get all posts for selected event
        const postsRef = collection(db, `events/${selectedEventId}/posts`);
        const snapshot = await getDocs(postsRef);

        const texts = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.text) {
            texts.push(data.text);
          }
        });

        console.log("Texts extracted:", texts);

        if (texts.length === 0) {
          console.warn("No feedback text found for event.");
          setSeverityData([]);
          return;
        }

        // Step 2: Send texts to batch-analyze API
        const batchResponse = await axios.post("https://pjxcharya-batch-analyse.hf.space/analyze-batch", {
          texts,
        });

        console.log("Batch analyze response:", batchResponse.data);

        const fullData = {
          issues: batchResponse.data?.issues || {},
          positive_emotions: batchResponse.data?.positive_emotions || {},
          negative_emotions: batchResponse.data?.negative_emotions || {},
          emotion_summary: batchResponse.data?.emotion_summary || {},
        };

        const severityResponse = await axios.post("https://pjxcharya-severity-classifier.hf.space/classify-severity", fullData);
        console.log("Severity classification response:", severityResponse.data);

        // if (severityResponse.data?.classified_issues) {
        //   const parsedIssues = Object.entries(severityResponse.data.classified_issues).map(
        //     ([issue, data]) => ({
        //       issue,
        //       severity: data.final_severity,
        //       combined_score: data.combined_score,
        //       original_count: data.original_count,
        //       original_severity: data.original_severity,
        //       original_impact_score: data.original_impact_score,
        //     })
        //   );

        //   setSeverityData(parsedIssues);
        //   setOverallMood(severityResponse.data.overall_mood || "");
        // } else {
        //   console.warn("No results found in severity response.");
        //   setSeverityData([]);
        //   setOverallMood("");
        // }

        if (severityResponse.data?.classified_issues) {
          const parsedIssues = Object.entries(severityResponse.data.classified_issues).map(
            ([issue, data]) => ({
              issue,
              severity: data.final_severity,
              combined_score: data.combined_score,
              original_count: data.original_count,
              original_severity: data.original_severity,
              original_impact_score: data.original_impact_score,
            })
          );
        
          // Sort by combined_score descending
          parsedIssues.sort((a, b) => b.combined_score - a.combined_score);
        
          setSeverityData(parsedIssues);
          setOverallMood(severityResponse.data.overall_mood || "");
        } else {
          console.warn("No results found in severity response.");
          setSeverityData([]);
          setOverallMood("");
        }
        

      } catch (err) {
        console.error("[fetchSeverityData] Error in chained API flow:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeverityData();
  }, [selectedEventId]);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md border border-yellow-300">
        <CardHeader className="bg-event-light-yellow rounded-t-md">
          <CardTitle className="text-xl">Organizer Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventId">Select Event</Label>
            <Select
              onValueChange={(val) => setSelectedEventId(val)}
              value={selectedEventId}
            >
              <SelectTrigger id="eventId">
                <SelectValue placeholder="Choose your event" />
              </SelectTrigger>
              <SelectContent>
                {eventList.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading && <p className="text-gray-500">Fetching data...</p>}

          {!loading && selectedEventId && severityData.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Severity Insights</h2>

              <div className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>Overall Event Mood:</strong>{" "}
                  <span className="capitalize font-medium text-blue-700">{overallMood}</span>
                </p>
              </div>

              {severityData.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 border-l-4 shadow"
                  style={{
                    borderColor:
                      item.severity === "high"
                        ? "#DC2626"
                        : item.severity === "medium"
                          ? "#FACC15"
                          : "#10B981",
                  }}
                >
                  <p>
                    <strong>Issue:</strong> {item.issue.replace(/_/g, " ")}
                  </p>
                  <p>
                    <strong>Severity:</strong>{" "}
                    <span className="capitalize">{item.severity}</span>
                  </p>
                  <p>
                    <strong>Combined Score:</strong> {item.combined_score}
                  </p>
                  <p>
                    <strong>Mentions:</strong> {item.original_count}
                  </p>
                  <p>
                    <strong>Original Severity:</strong> {item.original_severity}
                  </p>
                  <p>
                    <strong>Impact Score:</strong> {item.original_impact_score}
                  </p>
                </Card>
              ))}
            </div>
          )}


          {!loading && selectedEventId && severityData.length === 0 && (
            <p className="text-gray-500">No severity data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerDashboard;

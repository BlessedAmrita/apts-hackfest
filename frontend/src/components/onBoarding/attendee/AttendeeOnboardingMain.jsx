
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import EventBanner from "./EventBanner";
import RegistrationForm from "./RegistrationForm";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [step, setStep] = useState("registration");
  const [userData, setUserData] = useState(null);
  const router = useRouter(); // Initialize router

  const handleRegistrationSubmit = async (data) => {
    if (!user) return alert("You must be logged in");
  
    const eventId = data.eventcode; // 🔥 This is the event code they entered
  
    try {
      // 🔍 Check if the event with that code exists
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);
  
      if (!eventSnap.exists()) {
        alert("Invalid event code! Please check and try again."); // 🧁 Replace this with toast if you want
        return;
      }
  
      // ✅ Event exists, proceed with onboarding
      await saveAttendeeOnboarding(user.uid, data);
      setUserData(data);
      setStep("feedback");
      router.push("/attendee");
    } catch (error) {
      console.error("Error verifying event code or saving data:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleFeedbackSubmit = (data) => {
    console.log("Registration data:", userData);
    console.log("Feedback data:", data);
    setStep("thankyou");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setStep("registration");
    setUserData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRegistration = () => {
    setStep("registration");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <EventBanner />
        <div className="container py-12">
          {step === "registration" && (
            <RegistrationForm onSubmit={handleRegistrationSubmit} />
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Index;

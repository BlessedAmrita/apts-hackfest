'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { useAuth } from "@/context/AuthContext";
import { submitOnboarding } from "../submitOnboarding"; 
import EventBanner from "./EventBanner";
import RegistrationForm from "./RegistrationForm";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [step, setStep] = useState("registration");
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleRegistrationSubmit = async (formData) => {
    setUserData(formData);
    setStep("feedback");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ✅ Submit to Firestore and update Redux state
    try {
      await submitOnboarding(formData, user, router, dispatch);
    } catch (error) {
      console.error("Error during onboarding:", error);
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

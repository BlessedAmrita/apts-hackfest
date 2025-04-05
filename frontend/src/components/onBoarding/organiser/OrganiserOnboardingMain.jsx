'use client';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EventBanner from "./EventBanner";
import RegistrationForm from "./RegistrationForm";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [step, setStep] = useState("registration");
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const handleRegistrationSubmit = async (data) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        console.error("No authenticated user");
        return;
      }
  
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
  
      await setDoc(userRef, {
        ...data,
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: "organiser", 
        timestamp: new Date(),
      });
  
      // Optionally save to Redux here (next step)
      setUserData(data);
      setStep("feedback");
  
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push("/organiser");
    } catch (error) {
      console.error("Error saving registration to Firestore:", error);
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


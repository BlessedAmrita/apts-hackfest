'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitOnboarding } from '../submitOnboarding';

// function AttendeeOnboardingMain() {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [eventId, setEventId] = useState('');
//   const [name, setName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!eventId.trim()) return alert('Event ID is required!');
//     submitOnboarding(
//       { role: 'attendee', eventId, name },
//       user,
//       router,
//       dispatch
//     );
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
//       <h2 className="text-xl font-bold">Attendee Onboarding</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           className="border p-2 w-full rounded"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Event ID"
//           value={eventId}
//           className="border p-2 w-full rounded"
//           onChange={(e) => setEventId(e.target.value)}
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Join Event
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AttendeeOnboardingMain;

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

  const handleRegistrationSubmit = (data) => {
    setUserData(data);
    setStep("feedback");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Redirect to the attendee page
    router.push("/attendee");
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

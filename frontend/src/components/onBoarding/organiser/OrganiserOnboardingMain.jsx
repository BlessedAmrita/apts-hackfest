// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitOnboarding } from '../submitOnboarding';

// function OrganiserOnboardingMain() {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [organization, setOrganization] = useState('');
//   const [eventName, setEventName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const eventId = `${user.uid}_${Date.now()}`; // 🔥 Unique event ID generation
//     submitOnboarding(
//       {
//         role: 'organiser',
//         eventName,
//         organization,
//         eventId,
//       },
//       user,
//       router,
//       dispatch
//     );
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
//       <h2 className="text-xl font-bold">Organiser Onboarding</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Organization Name"
//           value={organization}
//           className="border p-2 w-full rounded"
//           onChange={(e) => setOrganization(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Event Name"
//           value={eventName}
//           className="border p-2 w-full rounded"
//           onChange={(e) => setEventName(e.target.value)}
//         />
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// }

// export default OrganiserOnboardingMain;

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
    router.push("/organiser");
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


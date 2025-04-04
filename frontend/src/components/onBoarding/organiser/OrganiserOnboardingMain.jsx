'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { submitOnboarding } from '../submitOnboarding';

function OrganiserOnboardingMain() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [organization, setOrganization] = useState('');
  const [eventName, setEventName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventId = `${user.uid}_${Date.now()}`; // 🔥 Unique event ID generation
    submitOnboarding(
      {
        role: 'organiser',
        eventName,
        organization,
        eventId,
      },
      user,
      router,
      dispatch
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">Organiser Onboarding</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Organization Name"
          value={organization}
          className="border p-2 w-full rounded"
          onChange={(e) => setOrganization(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          className="border p-2 w-full rounded"
          onChange={(e) => setEventName(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default OrganiserOnboardingMain;

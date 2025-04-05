'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import EventHeader from './EventHeader';
import DashboardCard from './DashboardCard';

const AttendeeDashboardMain = () => {
  const router = useRouter();
  const eventId = 'abc123'; // Replace with dynamic ID if needed

  const dashboardItems = [
    {
      id: 'before-event',
      title: 'Before Event Form',
      description: 'Share your expectations and preferences to help us tailor the event to your needs.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-amber-600"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M12 11h4" />
          <path d="M12 16h4" />
          <path d="M8 11h.01" />
          <path d="M8 16h.01" />
        </svg>
      ),
      to: '/before-event',
      completed: false,
    },
    {
      id: 'community-forum',
      title: 'Community Forum',
      description: 'Connect with other attendees, ask questions, and participate in discussions.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-amber-600"
        >
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
      ),
      to: '', // Will be handled via onClick
      completed: false,
    },
    {
      id: 'after-event',
      title: 'After Event Form',
      description: 'Provide feedback about the event and help us improve future experiences.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-amber-600"
        >
          <path d="M3 5L19 5C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19L3 19C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5Z" />
          <path d="M9.5 9L7.5 12L9.5 15" />
          <path d="M14.5 9L16.5 12L14.5 15" />
        </svg>
      ),
      to: '/after-event',
      completed: false,
    }
  ];

  return (
    <div className="min-h-screen bg-event-light-yellow animate-fade-in">
      <EventHeader />
      
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          Your Event Dashboard
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              to={item.to}
              completed={item.completed}
              onClick={
                item.id === 'community-forum'
                  ? () => router.push(`/attendee/events/${eventId}/communityForum`)
                  : undefined
              }
            />
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Event Information</h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> April 15-17, 2025
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Location:</span> Tech Convention Center, San Francisco
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contact:</span> support@techconference.example.com
            </p>
            <p className="text-gray-600 text-sm">
              Please make sure to complete all required forms. Your input helps us create the best possible experience for everyone!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboardMain;

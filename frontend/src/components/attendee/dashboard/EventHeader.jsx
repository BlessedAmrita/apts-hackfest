import { useState, useEffect } from 'react';

const EventHeader = ({
  eventName = "Annual Tech Conference 2025",
  attendeeName = "Alex Johnson"
}) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="relative overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-event-yellow to-amber-400 opacity-90"></div>

      <div className="relative p-8 md:p-10 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-sm">
          {eventName}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/90 text-lg">
              {greeting}, {attendeeName}!
            </p>
            <p className="text-white/80 text-sm md:text-base mt-1">
              Complete all forms to make the most of your event experience
            </p>
          </div>

          <div className="animate-float">
            <div className="inline-block bg-white/95 shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
              <p>Event ID: <span className="font-semibold">TC-2025</span></p>
              <p>Attendee Status: <span className="text-green-600 font-semibold">Confirmed</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;

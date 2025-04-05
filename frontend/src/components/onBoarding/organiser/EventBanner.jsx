import { CalendarCheck } from "lucide-react";

const EventBanner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-event-light-yellow to-event-yellow py-16 md:py-24">
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Event Management & Organizer Hub
          </h1>
          <p className="text-xl text-gray-800 mb-8">
          Host amazing events and grow your organizer profile - helping you create memorable experiences for attendees.
          </p>
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <CalendarCheck className="h-5 w-5" />
            <span>Multiple event hosting opportunities available</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 transform skew-x-12"></div>
      <div className="absolute left-0 bottom-0 h-16 w-full bg-white/20 -skew-y-1"></div>
      <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/20 animate-pulse-light"></div>
      <div className="absolute left-1/4 bottom-10 h-16 w-16 rounded-full bg-white/10 animate-pulse-light"></div>
    </div>
  );
};

export default EventBanner;

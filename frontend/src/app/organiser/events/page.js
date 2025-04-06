"use client";
import OrganiserEventsMain from "@/components/organiser/events/OrganiserEventsMain";
import { useRouter } from "next/navigation";

const EventsPage = () => {
  const router = useRouter();

  const events = [
    { id: 1, name: "Marathon 2025" },
    { id: 2, name: "Yoga Workshop" },
    { id: 3, name: "Cycling Championship" }
  ];

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map(event => (
          <div
            key={event.id}
            className="p-4 border rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => router.push(`/organiser/events/${event.id}`)}
          >
            <h2 className="text-xl font-semibold">{event.name}</h2>
          </div>
        ))}
      </div> */}
     <OrganiserEventsMain />
    </div>
  );
};

export default EventsPage;  

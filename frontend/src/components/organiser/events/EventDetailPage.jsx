import { useParams, Link } from "react-router-dom";
import { mockEvents } from "../content/events/mockEvents";
import { format } from "date-fns";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
          <p className="mt-2 text-gray-600">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/events"
            className="mt-4 inline-block text-orange hover:text-orange-dark"
          >
            Back to all events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/events"
            className="text-orange hover:text-orange-dark flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to events
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="inline-block mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === "ongoing"
                      ? "bg-green-500 text-white"
                      : event.status === "upcoming"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">{event.title}</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10m-10 4h10m2 5H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"
                />
              </svg>
              {format(new Date(event.date), "MMMM d, yyyy")}
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 12.414A8 8 0 1116 8h.293a8 8 0 01-1.05 8.657z"
                />
              </svg>
              {event.location}
            </div>

            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

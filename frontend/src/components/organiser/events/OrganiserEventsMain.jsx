import { useState } from "react";
import { Tab } from "@headlessui/react";
import { mockEvents } from "@/content/events/mockEvents";
import EventCard from "./EventCard";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const OrganiserEventsMain = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedEvents = {
    "Current": filteredEvents.filter(event => event.status === "ongoing"),
    "Upcoming": filteredEvents.filter(event => event.status === "upcoming"),
    "Past": filteredEvents.filter(event => event.status === "past")
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <button className="bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-md font-medium shadow-sm transition-colors duration-300">
            Create New Event
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange focus:border-orange sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-white rounded-xl shadow">
              {Object.keys(categorizedEvents).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm font-medium text-gray-700 rounded-lg',
                      'focus:outline-none',
                      selected
                        ? 'bg-orange/10 text-orange shadow font-semibold'
                        : 'hover:bg-orange/5'
                    )
                  }
                >
                  {category} ({categorizedEvents[category].length})
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
              {Object.keys(categorizedEvents).map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'bg-transparent rounded-xl p-1',
                    'focus:outline-none'
                  )}
                >
                  {categorizedEvents[category].length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorizedEvents[category].map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-500 text-lg">No {category.toLowerCase()} events found.</p>
                    </div>
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default OrganiserEventsMain;
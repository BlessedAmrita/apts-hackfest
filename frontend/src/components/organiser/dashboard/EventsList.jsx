import React from "react";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: "1",
    name: "Summer Music Festival",
    date: "Aug 15-17, 2023",
    location: "Central Park, NY",
    attendees: 1250,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&q=75&fit=crop&w=600"
  },
  {
    id: "2",
    name: "Tech Conference 2023",
    date: "Sep 5-7, 2023",
    location: "Convention Center, SF",
    attendees: 850,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&q=75&fit=crop&w=600"
  },
  {
    id: "3",
    name: "Food & Wine Expo",
    date: "Jul 8-10, 2023",
    location: "Riverside Hall, Chicago",
    attendees: 675,
    status: "active",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&q=75&fit=crop&w=600"
  },
  {
    id: "4",
    name: "Corporate Leadership Summit",
    date: "Jun 12-13, 2023",
    location: "Grand Hotel, LA",
    attendees: 350,
    status: "completed",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&q=75&fit=crop&w=600"
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "completed":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "";
  }
};

const EventsList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Your Events</CardTitle>
          <CardDescription>Manage your upcoming and past events</CardDescription>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <div key={event.id} className="event-card relative p-3 border rounded-xl shadow-sm">
              <div 
                className="h-32 mb-3 bg-center bg-cover rounded-lg" 
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <Badge className={getStatusColor(event.status)} variant="outline">
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <h3 className="font-semibold mt-2">{event.name}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users size={14} className="mr-2" />
                  {event.attendees.toLocaleString()} attendees
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsList;

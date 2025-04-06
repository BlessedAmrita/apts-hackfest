import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getFirestore,
  collectionGroup,
  getDocs
} from "firebase/firestore";

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    source: "",
    phonenumber: "",
    eventId: "", 
    role: "attendee",
  });

  const [eventList, setEventList] = useState([]);

  // Fetch event IDs and names from Firestore
  useEffect(() => {
    const fetchEventList = async () => {
      const db = getFirestore();
      try {
        const snapshot = await getDocs(collectionGroup(db, "metadata"));
        const infoDocs = snapshot.docs.filter(doc => doc.id === "info");

        const events = infoDocs.map((doc) => {
          const pathSegments = doc.ref.path.split("/");
          const eventId = pathSegments[1];
          const data = doc.data();
          return {
            id: eventId,
            name: data.name || eventId, // fallback if name is missing
          };
        });

        setEventList(events);
      } catch (err) {
        console.error("[fetchEventList] Error:", err);
      }
    };

    fetchEventList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleEventChange = (value) => {
    setFormData((prev) => ({ ...prev, eventId: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in bg-white border-event-light-yellow">
      <CardHeader className="bg-event-light-yellow rounded-t-lg">
        <CardTitle className="text-center text-2xl font-bold">
          Register for Event
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Join us for an amazing experience!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="1"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={handleGenderChange} value={formData.gender}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input
              id="phonenumber"
              name="phonenumber"
              type="number"
              placeholder="Your contact number"
              value={formData.phonenumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* 🎯 Event Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="eventId">Select Event</Label>
            <Select onValueChange={handleEventChange} value={formData.eventId}>
              <SelectTrigger id="eventId">
                <SelectValue placeholder="Choose an event to join" />
              </SelectTrigger>
              <SelectContent>
                {eventList.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="City, State"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label htmlFor="source">How did you hear about us?</Label>
            <Input
              id="source"
              name="source"
              placeholder="e.g. Instagram, friend, website..."
              value={formData.source}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-event-yellow hover:bg-yellow-500 text-black"
            disabled={
              !formData.name ||
              !formData.age ||
              !formData.gender ||
              !formData.phonenumber ||
              !formData.location ||
              !formData.source ||
              !formData.eventId
            }
          >
            Register Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    organisationname:"",
    phonenumber: "",
    experience: "",
    biography: "",
    eventTypes: [],
    eventname: "",
  });

  const eventTypeOptions = [
    "Conferences", 
    "Workshops", 
    "Corporate Events",
    "Concerts",
    "Exhibitions",
    "Webinars",
    "Social Gatherings"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-fade-in bg-white border-event-light-yellow">
      <CardHeader className="bg-orange-80 rounded-t-lg">
        <CardTitle className="text-center text-2xl font-bold">
          Register as an Organiser
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
        Start creating and managing your own events!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-event-yellow focus:ring-event-yellow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organisationname">Company/Organisation Name</Label>
            <Input
              id="organisationname"
              name="organisationname"
              placeholder="Enter your organisation name"
              value={formData.organisationname}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-event-yellow focus:ring-event-yellow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input
              id="phonenumber"
              name="phonenumber"
              type="number"
              min="10"
              placeholder="Your contact number"
              value={formData.phonenumber}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-event-yellow focus:ring-event-yellow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience in Event Management</Label>
            <Input
              id="experience"
              name="experience"
              type="number"
              min="1"
              placeholder="e.g. 5"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-event-yellow focus:ring-event-yellow"
            />
          </div>


          <div>
  <p className="block text-sm font-medium text-gray-700 mb-3">
    Types of Events You Organize
  </p>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
    {eventTypeOptions.map((type) => (
      <div
        key={type}
        className={`
          cursor-pointer rounded-md px-3 py-2 text-sm border transition-all
          ${
            formData.eventTypes.includes(type)
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-200 hover:border-orange-300'
          }
        `}
        onClick={() => handleEventTypeSelection(type)}
      >
        {type}
      </div>
    ))}
  </div>
</div>


            <div className="space-y-2">
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
                Brief Biography/Description
              </label>
              <Textarea
                id="biography"
                name="biography"
                placeholder="Tell us about yourself, your experience, and your organizing style..."
                value={formData.biography}
                onChange={handleChange}
                className="w-full h-32"
              />
            </div>

            <div className="space-y-2">
            <Label htmlFor="eventname">Event Name</Label>
            <Input
              id="eventname"
              name="eventname"
              placeholder="Enter your event name"
              value={formData.eventname}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-event-yellow focus:ring-event-yellow"
            />
          </div>           

          <Button
            type="submit"
            className="w-full bg-orange-200 hover:bg-orange-300 text-black"
            disabled={
              !formData.name ||
              !formData.organisationname ||
              !formData.phonenumber ||
              !formData.experience ||
              !formData.biography ||
              !formData.eventname
            }

          >
            Create Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;


import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { db } from "@/firebase/firebase"; // make sure this exports your firestore instance
import { doc, setDoc } from "firebase/firestore";

const generateEventId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const CreateEventButton = () => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    type: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const eventId = generateEventId();

    try {
      await setDoc(doc(db, "events", eventId, "metadata", "info"), {
        ...formData,
        eventId,
        createdAt: serverTimestamp()
      });

      await navigator.clipboard.writeText(eventId);
      toast.success(
        `Event "${formData.name}" created! Event ID copied: ${eventId}`
      );

      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        location: "",
        type: "",
        description: ""
      });
      setOpen(false); // close dialog
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={18} />
          Create New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border border-yellow-400 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Summer Music Festival" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location} onChange={handleChange} placeholder="Central Park, New York" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select onValueChange={handleSelectChange} value={formData.type}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-yellow-400 shadow-md rounded-xl">
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={formData.description} onChange={handleChange} placeholder="A brief description of your event" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventButton;
